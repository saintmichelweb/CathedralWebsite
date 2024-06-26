import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, Checkbox, Divider, Heading, HStack, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { SelectOption } from '@/types/forms'
import type { RoleInfo } from '@/types/roles'
import { User } from '@/types/users'
import {
  addNewUserSchema,
  EditUserForm,
  type AddNewUserForm,
} from '@/lib/validations/addNewUser'
import { useDfsps } from '@/api/hooks/dfsps'
import { useRoles } from '@/api/hooks/roles'
import { useCreateUser, useUpdateUser, useUserProfile } from '@/api/hooks/users'
import { AlertDialog, CustomButton, Skeleton } from '@/components/ui'
import { CustomFormSelect, FormInput } from '@/components/form'
import { PortalRolesLevels } from 'shared-lib'

interface AddNewUserProps {
  user?: User | null
  onCloseModal?: () => void
  onFetch?: () => void
}

const AddNewUser = (props: AddNewUserProps) => {
  const user: User | null | undefined = props.user
  const navigate = useNavigate()

  const roles = useRoles()
  const dfsps = useDfsps({ all: true })
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const userProfile = useUserProfile()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddNewUserForm>({
    resolver: zodResolver(addNewUserSchema),
  })
  let roleOptions: SelectOption[] = []

  const [isDfspUser, setIsDfspUser] = useState(false)
  const [userRole, setUserRole] = useState<SelectOption | null>(null)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [newUserPayload, setNewUserPayload] = useState<AddNewUserForm>()

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('phone', user.phone_number)
      setUserRole({ label: user.role, value: user.role_id })
      setValue('role', user.role_id)
    }
  }, [setValue, user])

  if (roles.isSuccess && userProfile.isSuccess && roles.data) {
    const roleData = roles.data
    let createAccesses: RoleInfo[] = Array.isArray(roleData) ? roleData : roleData.data
    if (userProfile.data.role?.level === PortalRolesLevels.Hub) {
      createAccesses = createAccesses.filter((role: RoleInfo) => role.level !== PortalRolesLevels.DFSP && role.level !== PortalRolesLevels.DFSP_USER )
    }

    if (createAccesses) {
      roleOptions = user
        ? createAccesses.map((roleInfo: RoleInfo) => ({
          label: roleInfo.name,
          value: roleInfo.id,
        }))
        : createAccesses.map(({ id, name }) => ({
          label: name,
          value: id,
        }))

      if (userProfile.data.role.name !== 'Hub Super Admin') {
        roleOptions = roleOptions.filter(role => role.label !== 'Hub Admin')
      }
    } else {
      roleOptions = []
    }
  }

  const onSubmit = async (values: AddNewUserForm) => {
    setNewUserPayload(values)
    setIsOpenModal(true)
  }

  const onConfirm = async (payload: AddNewUserForm | undefined) => {
    setIsOpenModal(false)
    if (payload) {
      if (user && props.onCloseModal) {
        const updatePayload: EditUserForm = {
          ...payload,
          userId: user.id,
        }
        updateUser.mutate(updatePayload)
        props.onCloseModal()
      } else {
        await createUser.mutateAsync(payload)
      }
      reset()
    }
  }

  useEffect(() => {
    if (updateUser.isSuccess && props.onFetch) props.onFetch()
  }, [props, updateUser.isSuccess])

  return (
    <Box
      minH='full'
      bg='primaryBackground'
      pt={user ? '0' : '6'}
      px={user ? {} : { base: '4', sm: '6', md: '12', xl: '20' }}
      pb={user ? '0' : '14'}
      flexGrow='1'
      alignSelf={'center'}
      alignItems={'center'}
    >
      {!user && (
        <Heading size='md' mb='10'>
          User Management
        </Heading>
      )}

      {roles.isLoading && (
        <Stack spacing='6'>
          {new Array(3).fill(0).map((_, index) => (
            <Box key={index}>
              <Skeleton h='3' maxW='10' mb='2' rounded='md' />
              <Skeleton h='10' maxW='25rem' rounded='md' />
            </Box>
          ))}
        </Stack>
      )}

      <Card p={5} maxW={{ lg: user ? 'full' : '25rem', sm: 'full' }}>
        <Stack as='form' spacing='4' onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name='name'
            register={register}
            errors={errors}
            label='Name'
            inputProps={{ bg: 'white' }}
            maxW={{ base: '25rem', sm: '90vw' }}
          />

          <FormInput
            name='email'
            register={register}
            errors={errors}
            label='Email'
            inputProps={{ bg: 'white' }}
            maxW={{ base: '25rem', sm: '90vw' }}
          />

          <FormInput
            name='phone'
            register={register}
            errors={errors}
            label='Telephone (0712345678)'
            inputProps={{ bg: 'white' }}
            maxW={{ base: '25rem', sm: '90vw' }}
          />

          {!user && !userProfile.data?.dfsp && (
            <Checkbox
              name='isDfspUser'
              isChecked={isDfspUser}
              onChange={e => setIsDfspUser(e.target.checked)}
            >
              Is DFSP User
            </Checkbox>
          )}

          {isDfspUser ? (
            dfsps.isSuccess && (
              <CustomFormSelect
                selectValue={userRole}
                isError={errors.dfsp_id ? true : false}
                errorMsg={errors.dfsp_id ? errors.dfsp_id.message : undefined}
                label='DFSP'
                placeholder='Choose DFSP'
                options={dfsps.data.data.map(({ dfspName, no }) => ({
                  label: dfspName,
                  value: no,
                }))}
                onChangeFn={selectedVal => {
                  setUserRole(selectedVal)
                  if (selectedVal) {
                    setValue('dfsp_id', selectedVal.value.toString())
                  }
                }}
                maxWVal={{ lg: '25rem', sm: '90vw' }}
              />
            )
          ) : (
            <CustomFormSelect
              selectValue={userRole}
              isError={errors.role ? true : false}
              errorMsg={errors.role ? errors.role.message : undefined}
              label='Role'
              placeholder='Choose Role'
              options={roleOptions}
              onChangeFn={selectedVal => {
                setUserRole(selectedVal)
                if (selectedVal) {
                  setValue('role', Number(selectedVal.value))
                }
              }}
              maxWVal={{ lg: '25rem', sm: '90vw' }}
            />
          )}
          <Divider mt={2} color={'gray.400'} />
          <HStack spacing='3' alignSelf='center' mt='2'>
            <CustomButton type='submit' isLoading={createUser.isPending} minW={'8rem'}>
              Submit
            </CustomButton>

            <CustomButton
              bg={'gray'}
              minW={'8rem'}
              onClick={() => {
                reset()
                if (user && props.onCloseModal) {
                  props.onCloseModal()
                } else {
                  navigate(-1)
                }
              }}
            >
              Cancel
            </CustomButton>
          </HStack>
        </Stack>
      </Card>
      <AlertDialog
        alertText={
          user
            ? 'Are you sure you want to edit this user?'
            : 'Are you sure you want to add this user?'
        }
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newUserPayload)}
      />
    </Box>
  )
}

export default AddNewUser

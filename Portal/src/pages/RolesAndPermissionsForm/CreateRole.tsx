import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Stack,
} from '@chakra-ui/react'

import { getPermissionsByRoleLevel } from '@/api/hooks/permissions'
import { useRoleLevels } from '@/api/hooks/roles'
import { AlertDialog, CustomButton } from '@/components/ui'
import { CustomFormSelect, FormInput } from '@/components/form'
import { PermissionsResponse } from '@/types/permissions'
import { SelectOption } from '@/types/forms'
import { AddNewRoleForm, addNewRoleSchema } from '@/lib/validations/RoleCreation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateRole } from '@/api/hooks/roles'



const CreateNewRole = () => {
  const roleLevels = useRoleLevels()
  const createRole = useCreateRole()
  const navigate = useNavigate()
  const [selectedPermissions, setSelectedPermissions] = useState([] as string[])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedLevel, setSelectedLevel] = useState<SelectOption | null>(null)
  const [permission, setPermission] = useState<PermissionsResponse | null>(null)
  const [newRolePayload, setNewRolePayload] = useState<AddNewRoleForm>()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<AddNewRoleForm>({
    resolver: zodResolver(addNewRoleSchema),
  })

  const onSubmit = async (values: AddNewRoleForm) => {
    setNewRolePayload(values)
    setIsOpenModal(true)
  }


  const onConfirm = async (payload: AddNewRoleForm | undefined) => {
    setIsOpenModal(false)
    if(payload){
      await createRole.mutateAsync(payload)
    }
    navigate('/portal-user-management/role-management')
  }

  const fetchPermissionbyRole = async (roleLevel: string) => {
    await getPermissionsByRoleLevel(roleLevel).then(permissions => {
      setPermission(permissions)
    })
  }

  return (
    <Box
      minH='full'
      bg='primaryBackground'
      pt='6'
      px={{ base: '4', sm: '6', md: '12', xl: '20' }}
      pb='14'
      flexGrow='1'
      alignSelf={'center'}
      alignItems={'center'}
    >
      <Heading size='md' mb='10'>
        Role Management - Create Role
      </Heading>

      <Card p={5} maxW='100rem'>
        <Stack as='form' spacing='4' onSubmit={handleSubmit(onSubmit)}>
            <FormInput name='name' label='Name' register={register} errors={errors} maxWidth='200rem'/>

            <FormInput name='description' label='Description' register={register} errors={errors} maxWidth='200rem'/>
          
          <CustomFormSelect
            label='Role Level'
            placeholder='Select Role Level'
            isError={errors.roleLevel ? true : false}
            errorMsg={errors.roleLevel? errors.roleLevel.message : undefined}
            selectValue={selectedLevel}
            options={roleLevels.data?.data.map((e: string) => ({
              label: `${e}`,
              value: e,
            }))}
            onChangeFn={selectedVal => {
              setSelectedLevel(selectedVal)

              if (selectedVal) {
                fetchPermissionbyRole(selectedVal.value.toString())
                setValue('roleLevel', selectedVal.value.toString())
              }
            }}
            maxWVal={{ lg: '25rem', sm: '90vw' }}
          />

          <Heading size='sm' mb='2'>
            Permissions
          </Heading>

          <FormControl mb='6'>
            <Grid templateColumns='repeat(auto-fill, minmax(200px, 1fr))' gap={4}>
              {permission &&
                permission.permissions.length > 0 &&
                permission.permissions.map((permission, index) => (
                  <Checkbox
                    key={index}
                    onChange={() =>{
                      if(selectedPermissions.includes(permission.name)){
                        setSelectedPermissions(selectedPermissions.filter((perm) => perm !== permission.name))
                        setValue('permissions', selectedPermissions.filter((perm) => perm !== permission.name))
                      }else{
                        setSelectedPermissions([...selectedPermissions, permission.name])
                        setValue('permissions', [...selectedPermissions, permission.name])
                      }
                    } }
                    isChecked={selectedPermissions.includes(permission.name)}
                  >
                    {permission.name}
                  </Checkbox>
                ))}
            </Grid>
            {errors.permissions && (
              <FormLabel color='red.500' fontSize='sm'>
                {errors.permissions.message}
              </FormLabel>
            )}
          </FormControl>
          <Divider />
          <HStack spacing='3' alignSelf='center' mt='2'>
            <CustomButton type='submit' minW={'7rem'}>
              Submit
            </CustomButton>
            <CustomButton bg={'gray'} minW={'7rem'} onClick={() => navigate(-1)}>
              Cancel
            </CustomButton>
          </HStack>
        </Stack>
      </Card>
      <AlertDialog
        alertText={`Are you sure do you want to add this role?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRolePayload)}
      />
    </Box>
  )
}

export default CreateNewRole

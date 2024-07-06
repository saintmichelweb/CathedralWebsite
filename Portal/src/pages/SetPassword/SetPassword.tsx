import { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useToast,
  VStack,
  type IconButtonProps,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible, AiFillWarning } from 'react-icons/ai'

import LogoDiosceseKigali from '../../assets/LogoDiosceseKigali.png'
import { setPasswordSchema, type SetPasswordForm } from '../../lib/validations/setPassword'
// import { useSetPassword } from '../../api/hooks/auth'
import { CustomButton } from '../../components/ui'
import { FormInput } from '../../components/form'
import { ChangePassword } from '../../types/users'
import Cookies from 'universal-cookie'
import { getUserProfile } from '../../api/users'
import { isAxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../api/auth'

interface Props {
  isChangePassword: boolean | null,
  token?: 'string'
}

const SetPassword = () => {
  const [isTokenNotExpired, setIsTokenNotExpired] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isSetPasswordpath = location.pathname === '/set-password' ? true : false
  const cookies = new Cookies()
  const token = cookies.get('token')
  const toast = useToast()

  useEffect(() => {
    if (token) {
      getUserProfile().then(() => {
        if (isSetPasswordpath) {
          setIsTokenNotExpired(true)
        }}).catch((error: any) => {
        if (
          token &&
          isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          cookies.remove('token')
        }
      })
    }

  }, [token])

  const logoutPrevSession = async () => {
    await logout().then(() => {
      cookies.remove('token') 
      setIsTokenNotExpired(false)
    }).catch((error) => {
      toast({
        title: 'Logout Failed!',
        description: `Logout failed with error "${error.response?.data.message}"` || 'Logout Failed. Please try again.',
        status: 'error',
      })
    })
  } 

  return (
    <Flex w='full' h='100vh' justify='center' align='center'>
      <Flex w='90vw' maxW='900px' rounded='xl' shadow='md' overflow='hidden'>
        <VStack
          w='50%'
          py='12'
          px='10'
          display={{ base: 'none', md: 'flex' }}
          justify='space-between'
          bg='#F0F9FF'
        >
          <Image src={LogoDiosceseKigali} w='60' />

          <Heading as='h1' color='black' textAlign='center'>
             Portal
          </Heading>

          <Box alignSelf='center' color='black' fontSize='sm' fontWeight='medium'>
            <Text>Hotline: +250-788-387-632</Text>
            <Text>Email: info@St Michael Parish.co.rw</Text>
          </Box>
        </VStack>

        <Stack
          w={{ base: '100%', md: '50%' }}
          py={{ base: '8', sm: '12' }}
          px={{ base: '6', sm: '10' }}
        >
          {isTokenNotExpired ?
            (<Box alignSelf='center' color={'red.600'} fontSize='sm' fontWeight='medium'>
              <Flex justify='center' align='center'>
                <Icon
                  aria-label='Hide password'
                  as={AiFillWarning}
                  background={'white'}
                  mb={'4'}
                  width={'5rem'}
                  height={'5rem'}
                />
              </Flex>
              <VStack
                w='100%'
                justify='space-between'
              >
                <Text color={'black'} fontSize={'xl'} mx={'2'}>Please, logout from your other session first and then to set your password</Text>
              </VStack>
              <VStack flexDir={'row'} justify='center' align='center' mt={'6'} mx={'6'}>
                <CustomButton
                  type='button'
                  size='md'
                  mx={'6'}
                  onClick={() => {
                    logoutPrevSession()
                  }}
                >
                  logout
                </CustomButton>
                <CustomButton
                  type='button'
                  size='md'
                  mx={'6'}
                  colorVariant='accent-outline'
                  onClick={() => navigate('/')}
                >
                  cancel
                </CustomButton>
              </VStack>
            </Box>) :
            (<>
              <Heading fontSize={'3xl'} mb={'6'}>
                Set your password
              </Heading>
              <SetPasswordBody isChangePassword={false} token={token} />
            </>)
          }
        </Stack>

      </Flex>
    </Flex>
  )
}

export const SetPasswordBody = (props: Props) => {
  const isChangePassword = props.isChangePassword
  const [isOldPasswordShown, setIsOldPasswordShown] = useState(false)
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const token = props.token
  const toast = useToast()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SetPasswordForm>({
    resolver: zodResolver(setPasswordSchema),
  })

  const errorToast = (message: string) => {
    toast({
      title: 'Set Password Error!',
      description: `Please ${message}`,
      status: 'error',
    })
  }

  // const setPassword = useSetPassword()

  const onSubmit = (values: SetPasswordForm) => {
    if (token && !isChangePassword) {
      errorToast('Please logout first from your other session.')
    } else if (isChangePassword && !values.oldPassword) {
      errorToast('Please enter your old password.')
    } else {
      const objectToSend: ChangePassword = { oldPassword: values.oldPassword, newPassword: values.newPassword }
      // setPassword.mutate(objectToSend)
    }
  }

  const iconButtonProps: Omit<IconButtonProps, 'icon' | 'aria-label'> = {
    size: 'lg',
    position: 'absolute',
    top: '2.35rem',
    right: '3',
    minW: 'auto',
    h: 'auto',
    p: '0.5',
    color: 'blackAlpha.800',
    bg: 'transparent !important',
    zIndex: 'docked', 
    _hover: { color: 'blackAlpha.600' },
  }

  return (

    <Stack as='form' onSubmit={handleSubmit(onSubmit)} w='full'>
      {isChangePassword &&
        <Box position='relative'>
          <FormInput
            name='oldPassword'
            register={register}
            errors={errors}
            label='Old Password'
            placeholder='Enter password'
            maxW='full'
            mb={isChangePassword ? '2' : '4'}
            inputProps={{ type: isOldPasswordShown ? 'text' : 'password' }}
          />

          {isOldPasswordShown ? (
            <IconButton
              aria-label='Hide password'
              icon={<AiFillEyeInvisible />}
              onClick={() => setIsOldPasswordShown(false)}
              {...iconButtonProps}
            />
          ) : (
            <IconButton
              aria-label='Show password'
              icon={<AiFillEye />}
              onClick={() => setIsOldPasswordShown(true)}
              {...iconButtonProps}
            />
          )}
        </Box>
      }

      <Box position='relative'>
        <FormInput
          name='newPassword'
          register={register}
          errors={errors}
          label='New Password'
          placeholder='Enter password'
          maxW='full'
          mb={isChangePassword ? '2' : '4'}
          inputProps={{ type: isNewPasswordShown ? 'text' : 'password' }}
        />

        {isNewPasswordShown ? (
          <IconButton
            aria-label='Hide password'
            icon={<AiFillEyeInvisible />}
            onClick={() => setIsNewPasswordShown(false)}
            {...iconButtonProps}
          />
        ) : (
          <IconButton
            aria-label='Show password'
            icon={<AiFillEye />}
            onClick={() => setIsNewPasswordShown(true)}
            {...iconButtonProps}
          />
        )}
      </Box>

      <Box position='relative'>
        <FormInput
          name='confirmPassword'
          register={register}
          errors={errors}
          label='Confirm Password'
          placeholder='Enter password'
          inputProps={{ type: isConfirmPasswordShown ? 'text' : 'password' }}
          maxW='full'
        />

        {isConfirmPasswordShown ? (
          <IconButton
            aria-label='Hide confirm password'
            icon={<AiFillEyeInvisible />}
            onClick={() => setIsConfirmPasswordShown(false)}
            {...iconButtonProps}
          />
        ) : (
          <IconButton
            aria-label='Show confirm password'
            icon={<AiFillEye />}
            onClick={() => setIsConfirmPasswordShown(true)}
            {...iconButtonProps}
          />
        )}
      </Box>

      <CustomButton
        type='submit'
        size='md'
        mt={isChangePassword ? '4' : '8'}
        isLoading={false}
      >
        Confirm
      </CustomButton>
    </Stack>
  )
}

export default SetPassword

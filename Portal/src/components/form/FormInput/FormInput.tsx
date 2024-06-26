import { InfoIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Tooltip,
  type FormControlProps,
  type InputProps,
} from '@chakra-ui/react'
import type { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface FormInputProps<T extends FieldValues> extends FormControlProps {
  name: Path<T>
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  label?: string
  placeholder?: string
  errorMsg?: string
  inputProps?: InputProps
  isUrl?: boolean
}

const FormInput = <T extends FieldValues>({
  name,
  register,
  errors,
  label,
  placeholder,
  errorMsg,
  inputProps,
  isUrl = false,
  ...props
}: FormInputProps<T>) => {
  return (
    <FormControl isInvalid={!!errors[name]} maxW={{ md: '20rem' }} {...props}>
      {label && <FormLabel fontSize='sm'>{label}</FormLabel>}
      <Stack direction={'row'} content='center' align={'center'}>
        <Input
          {...register(name)}
          placeholder={placeholder}
          type='text'
          {...inputProps}
        />
        {isUrl && (
          <Tooltip
            hasArrow
            label='URL start with http...(eg: http://www.example.rw)'
            fontSize='md'
          >
            <InfoIcon color={'info'} mb={1} />
          </Tooltip>
        )}
      </Stack>
      <FormErrorMessage>
        {errorMsg || errors[name]?.message?.toString() || ''}
      </FormErrorMessage>
    </FormControl>
  )
}

export default FormInput

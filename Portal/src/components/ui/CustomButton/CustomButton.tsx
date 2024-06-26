import { forwardRef } from 'react'
import { Button, type ButtonProps } from '@chakra-ui/react'

interface CustomButtonProps extends ButtonProps {
  colorVariant?: 'accent' | 'accent-outline' | 'success' | 'danger' | 'info' | 'info-outline' | 'black-outline'
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, type = 'button', colorVariant = 'accent', ...props }, ref) => {
    const variants: Record<typeof colorVariant, ButtonProps> = {
      accent: {
        color: 'white',
        bg: 'accent',
        _hover: { opacity: 0.7 },
        _active: { bg: 'accent' },
      },
      'accent-outline': {
        color: 'accent',
        bg: 'transparent',
        border: '1px',
        borderColor: 'accent',
        _hover: { opacity: 0.6, bg: 'transparent' },
      },
      success: {
        color: 'white',
        bg: 'success',
        _hover: { opacity: 0.7 },
        _active: { bg: 'success' },
      },
      danger: {
        color: 'white',
        bg: 'danger',
        _hover: { opacity: 0.7 },
        _active: { bg: 'danger' },
      },
      info: {
        color: 'white',
        bg: 'info',
        _hover: { opacity: 0.7 },
        _active: { bg: 'info' },
      },
      'info-outline': {
        color: 'info',
        bg: 'transparent',
        border: '1px',
        borderColor: 'info',
        _hover: { opacity: 0.6, bg: 'transparent' },
      },
      'black-outline': {
        color: 'black',
        bg: 'transparent',
        border: '1px',
        borderColor: 'black',
        _hover: { opacity: 0.6, bg: 'transparent' },
      },
    }

    return (
      <Button
        ref={ref}
        type={type}
        size='sm'
        transition='all 0.3s ease-out'
        {...variants[colorVariant]}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

export default CustomButton

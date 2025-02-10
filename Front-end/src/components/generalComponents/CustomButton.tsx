import React from 'react'
import { useTranslation } from 'react-i18next'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'yellow'

interface CustomButtonProps {
    children?: React.ReactNode
    onClick?: () => void
    variant?: ButtonVariant
    disabled?: boolean
    className?: string
    translationKey: string
}

const getVariantClasses = (variant: ButtonVariant) => {
    switch (variant) {
        case 'primary':
            return 'bg-blue-500 text-white hover:bg-blue-600'
        case 'secondary':
            return 'bg-gray-500 text-white hover:bg-gray-600'
        case 'danger':
            return 'bg-red-500 text-white hover:bg-red-600'
        case 'yellow':
            return 'bg-customYellow text-white hover:bg-yellow-600'
        default:
            return ''
    }
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    onClick,
    variant = 'yellow',
    disabled = false,
    className = '',
    translationKey,
}) => {
    const { t } = useTranslation()
    const baseClasses = 'px-4 py-1 rounded focus:outline-none'
    const variantClasses = getVariantClasses(variant)
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
        >
            {t(translationKey)}
        </button>
    )
}

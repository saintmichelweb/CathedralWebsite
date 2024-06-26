import { Badge } from '@chakra-ui/react'

interface BadgeProps {
  title: string
  color?: string
  borderRadiusSize?: number
  widthSize?: number
  heightSize?: number
}
export const CustomBadge = (props: BadgeProps) => {
  const {
    title,
    color = 'green',
    borderRadiusSize = 8,
    widthSize = 40,
    heightSize = 8,
  } = props

  return (
    <Badge
      variant='solid'
      colorScheme={color}
      sx={{
        borderRadius: borderRadiusSize,
        alignContent: 'center',
        width: widthSize,
        height: heightSize,
        textAlign: 'center',
      }}
    >
      {title}
    </Badge>
  )
}

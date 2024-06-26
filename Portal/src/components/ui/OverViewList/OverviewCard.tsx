import { ReactNode } from 'react'
import { As, Card, CardHeader, Icon, List, Stack, Stat, StatLabel, StatNumber } from '@chakra-ui/react'

import { formatAmount } from '../../../utils'

interface CardViewProps {
  title: string
  listBody: ReactNode
  totalNumber?: number
  showTotal?: boolean
}
export const OverviewCard = (props: CardViewProps) => {
  const { title, listBody, totalNumber = 0, showTotal = true } = props

  return (
    <>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        sx={{ justifyContent: 'space-between', alignItems: { lg: 'center' } }}
        pr={5}
        mt={showTotal?2:0}
      >
        <CardHeader pb={showTotal?'':1.5}>
          <Stat>
            {showTotal && (<StatNumber>{formatAmount(totalNumber)}</StatNumber>)}
            <StatLabel fontSize={showTotal?'1rem':'1.1rem'}>{title}</StatLabel>
          </Stat>
        </CardHeader>
      </Stack>
      <List>{listBody}</List>
    </>
  )
}

interface CardProps {
  title: string
  totalNumber?: number
  bigIcon?: boolean
  iconColor?: string
  iconName?: As
}

export const OverviewPageCard = (props: CardProps) => {
  const { title, totalNumber = 0, bigIcon= false, iconColor, iconName } = props

  return (
    <Card bg={'#ECECEC'}>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        sx={{ justifyContent: 'space-between', alignItems: { lg: 'center' } }}
        pr={5}
        mt={2}
      >
        <CardHeader>
        <Stack direction={'row'} content='center' align={'center'} spacing={'5rem'} px={8}>
          <Stat>
            <StatLabel fontSize={'1rem'} >{title}</StatLabel>
            <StatNumber>{formatAmount(totalNumber)}</StatNumber>
          </Stat>
          {iconName &&(<Icon as={iconName} color={iconColor} boxSize={bigIcon?'4rem':10}/>)}
          </Stack>
        </CardHeader>
      </Stack>
    </Card>
  )
}

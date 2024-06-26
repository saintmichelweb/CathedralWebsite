import { Icon, Image, StackProps, Text, VStack } from '@chakra-ui/react'
import { TbFaceIdError } from "react-icons/tb";
import emptyData from './empty-data.svg'

interface EmptyStateProps extends StackProps {
  text: string
  isError?: boolean
}

const EmptyState = ({ text, isError=false, ...props }: EmptyStateProps) => {
  /* c8 ignore next 10 */
  return (
    <VStack textAlign='center' {...props}>
    
      {isError?(<Icon as={TbFaceIdError} color={'red'} boxSize={'5rem'}/>): (<Image src={emptyData} w='16' />)}
      

      <Text fontSize='16px' mt='1' fontWeight='semibold' color={isError?'red':'black'}>
        {text}
      </Text>
    </VStack>
  )
}

export default EmptyState

import { ReactNode } from 'react'
import {
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

import { CustomButton, SectionLoader } from '../../../components/ui'

interface ModalProps {
  headerTitle: string
  isLoading?: boolean
  isOpen: boolean
  child: ReactNode
  isCentered?: boolean
  scrollInside?: boolean
  onClose: () => void
  widthSize?: string
  saveButtonIsDisabled?: boolean
  handleSave?: () => void
  saveBtnTitle?: string
  cancelBtnTitle?: string
  showFooter?: boolean
}

const CustomModal = ({
  headerTitle,
  isOpen,
  onClose,
  isLoading,
  child,
  isCentered = false,
  scrollInside = true,
  widthSize = '90vw',
  saveButtonIsDisabled = true,
  handleSave,
  cancelBtnTitle = 'Cancel',
  saveBtnTitle = 'Submit',
  showFooter = true,
}: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={scrollInside ? 'inside' : 'outside'}
      isCentered={isCentered}
    >
      <ModalOverlay bg='hsl(0, 0%, 100%, 0.6)' backdropFilter='blur(4px)' />

      <ModalContent
        w={{ base: '90vw', lg: widthSize }}
        maxW='1000px'
        mt='14'
        mb={{ base: '14', lg: '0' }}
      >
        <ModalHeader py='5' borderBottom='1px' borderColor='gray.100'>
          <Heading as='h3' size='md'>
            {headerTitle}
          </Heading>
        </ModalHeader>
        <ModalCloseButton top='2.5' right='4' />

        <ModalBody py='5' px={{ base: '4', md: '6' }} bg={'primaryBackground'}>
          {isLoading && <SectionLoader />}

          {child}
        </ModalBody>
        <Divider />
        {showFooter && (
          <ModalFooter sx={{ display: 'flex', justifyContent: 'center' }}>
            {handleSave && (
              <CustomButton
                autoFocus
                onClick={handleSave}
                variant='contained'
                sx={{ width: 150, marginRight: 10 }}
                isDisabled={saveButtonIsDisabled}
              >
                {saveBtnTitle}
              </CustomButton>
            )}

            <CustomButton
              autoFocus
              onClick={onClose}
              variant='contained'
              sx={{ background: 'gray', width: 150 }}
            >
              {cancelBtnTitle}
            </CustomButton>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CustomModal

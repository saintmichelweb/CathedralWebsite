import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VisuallyHiddenInput,
} from '@chakra-ui/react'
import { FaRegFileLines } from 'react-icons/fa6'
import { LuFileCheck } from 'react-icons/lu'
import { MdOutlineCloudUpload } from 'react-icons/md'

import { AlertDialog, CustomButton } from '@/components/ui'

import './fileUploadModal.css'

import { useNavigate } from 'react-router-dom'
import { FileUploadModuleName } from 'shared-lib'

import { fileUploadRequest } from '@/types/merchants'
import { useUploadMerchantBatchFile } from '@/api/hooks/merchants'

interface FileUploadModalProps {
  isOpen: boolean
  onClose: () => void
  isUploading: boolean
  setIsUploading: (isUploading: boolean) => void
  openFileInput: () => void
  moduleName: FileUploadModuleName
  setFile?: (file: File) => void
  subTitle?: string
  windowId?: number | string | undefined
  onFetch?: () => void
}

const CustomFileUploadModal = ({
  isOpen,
  onClose,
  isUploading,
  setIsUploading,
  setFile,
  subTitle,
  moduleName,
  windowId,
  onFetch,
}: FileUploadModalProps) => {
  const navigate = useNavigate()
  const intervalRef = useRef<NodeJS.Timeout>()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [fileData, setFileData] = useState<File | null>(null)
  const [fileName, setFilename] = useState('')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isLargeFile, setIsLargeFile] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const strokeDashoffset = 190 - (190 * uploadProgress) / 100

  const fileRef = useRef<HTMLInputElement>(null)
  const uploadBatchFile = useUploadMerchantBatchFile()

  const onUploadFile = async (payload: fileUploadRequest) => {
    try {
      setIsLoading(true)
      uploadBatchFile.mutate(payload)
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setIsLoading(false)
      setIsOpenModal(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetUploadStates = () => {
    setUploadProgress(0)
    setIsUploading(false)
  }

  useEffect(() => {
    if (!isUploading) return

    intervalRef.current = setInterval(() => {
      setUploadProgress(prevState => prevState + 10)
    }, 150)
  }, [isUploading])

  useEffect(() => {
    if (uploadProgress === 100) {
      clearInterval(intervalRef.current)
      setIsUploading(false)
    }
  }, [uploadProgress, setIsUploading, fileData])

  useEffect(() => {
    if (uploadBatchFile.isSuccess) {
      if (moduleName === FileUploadModuleName.MERCHANT_REGISTRATION) {
        const intervalId = setInterval(() => {
          onClose()
          resetUploadStates()
          navigate('/merchant-records/batch-logs')
        }, 300)
        return () => {
          clearInterval(intervalId)
        }
      } else {
        onFetch ? onFetch() : null
        onClose()
        resetUploadStates()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadBatchFile.isSuccess])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetUploadStates()
        onClose()
      }}
    >
      <ModalOverlay bg='hsl(0, 0%, 100%, 0.6)' backdropFilter='blur(4px)' />
      <ModalContent w='90vw' maxW='750px' my='auto'>
        <ModalHeader py='3' borderBottom='1px' borderColor='gray.100'>
          <Heading as='h3' size='md'>
            Upload File
          </Heading>
        </ModalHeader>
        <ModalCloseButton top='2.5' right='4' />

        <ModalBody py='5' px={{ base: '6', md: '10' }}>
          {subTitle && <Text>{subTitle}</Text>}

          <Flex
            align='center'
            justify='center'
            w='full'
            h='270px'
            mt='8'
            bg={isDraggingOver ? 'blue.50' : 'white'}
            borderWidth='1px'
            borderStyle='dashed'
            borderColor='#c5c5c5'
            rounded='md'
            className={isDraggingOver ? 'dragging-over' : ''}
            onDrop={e => {
              e.preventDefault()
              setIsDraggingOver(false)
              resetUploadStates()

              if (e.dataTransfer.files[0].type !== 'text/csv') return

              setFilename(e.dataTransfer.files[0].name)
              setFileData(e.dataTransfer.files[0])
              setFile ? setFile(e.dataTransfer.files[0]) : ''
              setIsUploading(true)
            }}
            onDragOver={e => e.preventDefault()}
            onDragEnter={() => setIsDraggingOver(true)}
            onDragLeave={() => setIsDraggingOver(false)}
            data-testid='dropzone'
          >
            <Stack content='center' align='center' spacing='3'>
              {!isUploading && isLargeFile && (
                <Text color={'red.400'}>
                  Sorry, large file selected, 20MB is maximum file size required!
                </Text>
              )}
              <Box w='20' h='20' position='relative'>
                {!isUploading && uploadProgress === 0 && (
                  <Icon
                    as={MdOutlineCloudUpload}
                    boxSize={12}
                    position='absolute'
                    top='50%'
                    left='50%'
                    transform='auto'
                    translateX='-50%'
                    translateY='-50%'
                  />
                )}

                {isUploading && (
                  <Icon
                    as={FaRegFileLines}
                    boxSize={6}
                    position='absolute'
                    top='50%'
                    left='50%'
                    transform='auto'
                    translateX='-50%'
                    translateY='-50%'
                  />
                )}

                {!isUploading && uploadProgress === 100 && (
                  <Icon
                    as={LuFileCheck}
                    boxSize={6}
                    position='absolute'
                    top='50%'
                    left='50%'
                    transform='auto'
                    translateX='-50%'
                    translateY='-50%'
                    color='green.400'
                  />
                )}

                {uploadProgress > 0 && (
                  <svg viewBox='0 0 80 80' style={{ rotate: '-90deg' }}>
                    <circle
                      cx='40'
                      cy='40'
                      r='30'
                      fill='none'
                      stroke='#DDE1E3'
                      strokeWidth={4}
                      strokeDasharray={190}
                      strokeDashoffset={0}
                      strokeLinecap='round'
                    />
                    <circle
                      cx='40'
                      cy='40'
                      r='30'
                      fill='none'
                      stroke='#48BB78'
                      strokeWidth={4}
                      strokeDashoffset={strokeDashoffset}
                      strokeDasharray={190}
                      strokeLinecap='round'
                      style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
                    />
                  </svg>
                )}
              </Box>

              <Box textAlign='center' fontSize='sm'>
                {!isUploading && uploadProgress === 0 && (
                  <>
                    <Text>Drag & Drop you CSV file here</Text>
                    <Text>OR</Text>
                  </>
                )}

                {isUploading && <Text>Uploading file...</Text>}

                {!isUploading && uploadProgress === 100 && (
                  <Text>{fileName} file uploaded successfully!</Text>
                )}
              </Box>
              <VisuallyHiddenInput
                id='fileUpload'
                ref={fileRef}
                type='file'
                // accept='.csv'
                onChange={e => {
                  setIsLargeFile(false)
                  setUploadProgress(0)
                  if (!e.target.files) return

                  if (e.target.files[0]) {
                    if (
                      e.target.files[0] &&
                      e.target.files[0].size &&
                      e.target.files[0].size > 20 * 1024 * 1024
                    ) {
                      //20MB
                      setIsLargeFile(true)
                    }
                    setFilename(e.target.files[0].name)
                    setFileData(e.target.files[0])
                    setFile ? setFile(e.target.files[0]) : ''
                    setIsUploading(true)
                  }
                }}
              />

              <CustomButton
                colorVariant='info'
                onClick={() => (fileRef.current ? fileRef.current.click() : '')}
              >
                {!isUploading && uploadProgress === 0 ? 'Browse Files' : 'Change file'}
              </CustomButton>
            </Stack>
          </Flex>
        </ModalBody>
        <Divider />
        <ModalFooter px='0' sx={{ display: 'flex', justifyContent: 'center' }}>
          <CustomButton
            isDisabled={!(uploadProgress === 100) || isLargeFile}
            mr={{ base: '6', md: '10' }}
            sx={{ width: 150 }}
            onClick={() => {
              setIsOpenModal(true)
            }}
          >
            Submit
          </CustomButton>
          <CustomButton
            autoFocus
            onClick={() => {
              resetUploadStates()
              onClose()
            }}
            variant='contained'
            sx={{ background: 'gray', width: 150 }}
          >
            Cancel
          </CustomButton>
        </ModalFooter>
      </ModalContent>
      <AlertDialog
        alertText={'Are you sure, do you want to upload this file?'}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onUploadFile({ file: fileData, module: moduleName, windowId })}
        loading={isLoading}
      />
    </Modal>
  )
}

export default CustomFileUploadModal

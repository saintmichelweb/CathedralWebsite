import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Icon, ListItem, Stack, Text, UnorderedList, VisuallyHiddenInput } from '@chakra-ui/react'
import { LuFileCheck } from 'react-icons/lu'
import { MdOutlineCloudUpload } from 'react-icons/md'
import CustomButton from '../CustomButton/CustomButton'


interface FileUploadModalProps {
  maxFileSize?: number
  isUploading: boolean
  isRestFiles: boolean
  setIsUploading: (isUploading: boolean) => void
  openFileInput: () => void
  setFile?: (file: FileList) => void
}

const ZoneFileUpload = ({
  setIsUploading,
  maxFileSize = 1,
  isRestFiles,
  isUploading,
  setFile,
}: FileUploadModalProps) => {
  const intervalRef = useRef<NodeJS.Timeout>()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [fileData, setFileData] = useState<FileList | null>(null)
  const [fileNameList, setFilenameList] = useState<File[]>([])
  const [fileError, setFileError] = useState<boolean>(false)
  const [fileErrorMessage, setFileErrorMessage] = useState<string>('')
  const strokeDashoffset = 190 - (190 * uploadProgress) / 100

  const fileRef = useRef<HTMLInputElement>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetUploadStates = () => {
    setUploadProgress(0)
    setIsUploading(false)
  }

  useEffect(() => {
    if (isRestFiles) {
      setFilenameList([])
      setFileData(null)
      resetUploadStates()
    }
  }, [isRestFiles])

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

  return (
    <Flex
      align='center'
      justify='center'
      w='full'
      h='full'
      // mt='8'
      bg={isDraggingOver ? 'blue.50' : 'white'}
      // borderWidth='1px'
      // borderStyle='dashed'
      // borderColor='#c5c5c5'
      rounded='md'
      className={isDraggingOver ? 'dragging-over' : ''}
      onDrop={e => {
        e.preventDefault()
        setFileError(false)
        setFileErrorMessage('')
        const fileList = e.dataTransfer.files
        setIsDraggingOver(false)
        resetUploadStates()
        if (!fileList) return
        for (const file of fileList) {
          if (file.size >  maxFileSize *4096 * 1024) {
            setFileError(true)
            setFileErrorMessage('Sorry, only image size less than 4mb is allowed...')
            return
          }
        }

        if (fileList) {
          const files: File[] = [...fileList]
          const allowedTypes = ['image/jpeg', 'image/png']
          if (fileList.length > 1) {
            setFileError(true)
            setFileErrorMessage('Sorry, only allowed to be attached at once...')
            return
          } else if (!files.some(file => allowedTypes.includes(file.type))) {
            setFileError(true)
            setFileErrorMessage('Sorry, only pdf and image image format allowed...')
            return
          } else {
            files && setFilenameList(files)
            setFileData(fileList)
            setFile ? setFile(fileList) : ''
            setIsUploading(true)
          }
        }
      }}
      onDragOver={e => e.preventDefault()}
      onDragEnter={() => setIsDraggingOver(true)}
      onDragLeave={() => setIsDraggingOver(false)}
      data-testid='dropzone'
    >
      <Stack content='center' align='center' spacing='3' >
        {fileError && <Text color={'red.400'}>{fileErrorMessage}</Text>}
        <Box w='20' h='20' position='relative'>
          {uploadProgress === 0 && (
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

          {uploadProgress === 100 && (
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
          {uploadProgress === 0 && (
            <>
              <Text>Drag & Drop your image here</Text>
              <Text>OR</Text>
            </>
          )}
          {isUploading && <Text>Loading image...</Text>}
          {!isUploading && uploadProgress === 100 && (
            <Box>
              <Text>File loaded successfully</Text>
              <Box textAlign='start'>
              <UnorderedList style={{alignSelf:'center'}}>
              {fileNameList &&
                fileNameList.length > 0 &&
                fileNameList.map((file, index) => {
                  return <ListItem key={index}>{file.name}</ListItem>
                })}
                </UnorderedList>
                </Box>
            </Box>
          )}
        </Box>
        <VisuallyHiddenInput
          id='fileUpload'
          ref={fileRef}
          type='file'
          multiple
          // accept='application/vnd.ms-excel,text/plain, application/pdf, image/*'
          accept='image/*'
          onChange={e => {
            const fileList = e.target.files
            setFileError(false)
            setFileErrorMessage('')
            setUploadProgress(0)
            if (!fileList) return

            for (const file of fileList) {
              if (file.size >  maxFileSize *4096 * 1024) {
                setFileError(true)
                setFileErrorMessage('Sorry, only image size less than 4mb is allowed...')
                return
              }
            }

            if (fileList) {
              const files: File[] = [...fileList]
              const allowedTypes = ['image/jpeg', 'image/png']
              if (fileList.length > 1) {
                setFileError(true)
                setFileErrorMessage('Sorry, only 1 image allowed to attach at once...')
                return
              } else if (!files.some(file => allowedTypes.includes(file.type))) {
                setFileError(true)
                setFileErrorMessage('Sorry, only image image format allowed...')
                return
              } else {
                files && setFilenameList(files)
                setFileData(fileList)
                setFile ? setFile(fileList) : ''
                setIsUploading(true)
              }
            }
          }}
        />

        <CustomButton
          colorVariant='info'
          onClick={() => (fileRef.current ? fileRef.current.click() : '')}
        >
          {uploadProgress === 0 ? 'Browse Image' : 'Change Image'}
        </CustomButton>
      </Stack>
    </Flex>
  )
}

export default ZoneFileUpload

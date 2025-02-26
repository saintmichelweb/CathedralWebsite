import { Box, Image, Stack } from "@chakra-ui/react"
import ZoneFileUpload from "./ZoneFileUpload"
import CustomButton from "../CustomButton/CustomButton";
import { useEffect, useMemo, useState } from "react";
interface FileUploadModalProps {
    // maxFileSize?: number
    // isUploading: boolean
    // isRestFiles: boolean
    // setIsUploading: (isUploading: boolean) => void
    // openFileInput: () => void
    setFile: (file: File) => void,
    imageUrl?: string | undefined,
    height?: string,
    width?: string,
}

const FileUploadModal = (props: FileUploadModalProps) => {
    const [isUploadImage, setIsuploadImage] = useState<boolean>(props.imageUrl? true : false)
    const [imageFileUrl, setImageFileUrl] = useState<string | undefined>(props.imageUrl || undefined)

    return (
        <Stack
            width={props.width || '30rem'}
            height={props.height || '30rem'}
            // bg={'secondary'}
            alignItems={'center'}
            justifyContent={"center"}
        >
            {!isUploadImage ?
                (
                    <ZoneFileUpload isUploading={false} isRestFiles={false} setIsUploading={() => true} openFileInput={() => null} setFile={(file) => {
                        setIsuploadImage(true)
                        setImageFileUrl(URL.createObjectURL(file[0]))
                        props.setFile(file[0])
                    }} />
                )
                :
                (
                    <Stack
                        alignItems={'center'}
                        justifyContent={"center"}
                    >
                        <Image
                            // maxW={'fit-content'}
                            // width={props.width || '30rem'}
                            height={props.height || '30rem'}
                            maxH={'fit-content'}
                            alt="Image"
                            objectFit={'contain'}
                            src={imageFileUrl}
                            crossOrigin="anonymous" 
                        />
                        <Box
                            position={'absolute'}
                            mt='15vw'
                        >
                            <CustomButton
                                colorVariant='info'
                                onClick={() => {
                                    setIsuploadImage(false)
                                    setImageFileUrl(undefined)
                                }}
                            >
                                Change Image
                            </CustomButton>
                        </Box>
                    </Stack>
                )
            }
        </Stack>
    )
}

export default FileUploadModal
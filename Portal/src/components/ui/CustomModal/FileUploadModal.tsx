import { Heading, Image, Stack } from "@chakra-ui/react"
import ZoneFileUpload from "./ZoneFileUpload"
import stMichelLogo from "../../../assets/Logo.png";




const FileUploadModal = () => {

    return (
        <Stack
            width={'50rem'}
            height={'50rem'}
            bg={'secondary'}
            alignItems={'center'}
            justifyContent={"center"}
        >
            {/* <ZoneFileUpload isUploading={false} isRestFiles={false} setIsUploading={() => true} openFileInput={() => null} /> */}
            <Image 
                maxW={'fit-content'} 
                maxH={'fit-content'} 
                bg="primary" 
                alt="Logo" 
                src={stMichelLogo}
            />
        </Stack>
    )
}

export default FileUploadModal
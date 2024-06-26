import { CheckCircleIcon, NotAllowedIcon, WarningIcon, EmailIcon } from '@chakra-ui/icons'
import { FaAd, FaEdit, FaEye, FaFileCsv, FaFileUpload, FaTrash } from 'react-icons/fa'
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TiExport } from "react-icons/ti";
import { RiFileExcel2Line } from "react-icons/ri";

interface IconProps {
  iconName:
    | 'fileUpload'
    | 'viewDetails'
    | 'exportCSV'
    | 'export'
    | 'delete'
    | 'edit'
    | 'add'
    | 'active'
    | 'disable'
    | 'done'
    | 'excel'
    | 'email'
    | 'warning',
    colorVal?: string
}

export const CommonIcons = ({ iconName, colorVal }: IconProps) => {
  switch (iconName) {
    case 'fileUpload':
      return <FaFileUpload />
    case 'viewDetails':
      return <FaEye />
    case 'delete':
      return <FaTrash />
    case 'edit':
      return <FaEdit />
    case 'add':
      return <FaAd />
    case 'exportCSV':
      return <FaFileCsv size={'1.2rem'} color={colorVal?colorVal:''}/>
    case 'excel':
      return <RiFileExcel2Line size={'1.2rem'} color={colorVal?colorVal:''}/>
    case 'export':
      return <TiExport size={'1.2rem'} />
    case 'active':
      return <CheckCircleIcon color={colorVal?colorVal:''}/>
    case 'disable':
      return <NotAllowedIcon color={colorVal?colorVal:''}/>
    case 'email':
      return <EmailIcon color={colorVal?colorVal:''}/>
    case 'warning':
        return  <WarningIcon color={colorVal?colorVal:''} boxSize={'1rem'}/>
    case 'done':
      return<IoCheckmarkDoneCircleOutline size={'1.3rem'} color={colorVal?colorVal:''}/>
    default:
      return null
  }
}

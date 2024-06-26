import { Divider, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'

import { CommonIcons, CustomLink } from '..'

interface ExportProps {
  onExportCSV: () => void
  onExportExcel: () => void
  isDisable?: boolean
}

const ExportButton = (props: ExportProps) => {
  const { onExportCSV, onExportExcel, isDisable=false } = props
  return (
    <Menu autoSelect={false} offset={[8, 0]}>
      <MenuButton disabled={isDisable}>
        <CustomLink colorVariant={'black-outline'} w={'7rem'} to={'#'} mx='2' isDisabled={isDisable}>
          <CommonIcons iconName='export' />
          <Text ml={2}>Export</Text>
        </CustomLink>
      </MenuButton>
      <MenuList minW='0' w={'7rem'}>
        <MenuItem px={0} _focus={{ bg: 'transparent' }} onClick={onExportCSV}>
        <CustomLink colorVariant={'info'} w={'6rem'} to={'#'} mx='2'>
          <CommonIcons iconName='exportCSV' />
          <Text ml={2}>CSV</Text>
        </CustomLink>
        </MenuItem>
        <Divider />
        <MenuItem px={0} _focus={{ bg: 'transparent' }} onClick={onExportExcel}>
        <CustomLink colorVariant={'green-outline'} w={'6rem'} to={'#'} mx='2'>
          <CommonIcons iconName='excel' />
          <Text ml={2}>Excel</Text>
        </CustomLink>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default ExportButton

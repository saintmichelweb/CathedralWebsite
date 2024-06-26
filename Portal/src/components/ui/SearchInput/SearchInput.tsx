/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from 'react'
import {
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
} from '@chakra-ui/react'
import { IoSearchSharp } from 'react-icons/io5'
import { LuListFilter } from 'react-icons/lu'
import { MdOutlineFilterListOff } from 'react-icons/md'

import { CustomButton, FormSkeleton } from '../../../components/ui'

interface ModalProps {
  isLoading?: boolean
  filterBody?: ReactNode
  searchBody?: ReactNode
  exportButton?: ReactNode
  onReset?: (filterVal?: boolean) => void
  widthSize?: number | string
  placeholderTitle?: string
  onSearch?: (query: string) => void
  showSearchButton?: boolean
  setQuery?: (query: string) => void
  largeSearch?: boolean
}

const SearchInput = ({
  onReset,
  isLoading,
  filterBody,
  searchBody,
  widthSize = 700,
  placeholderTitle = 'Enter value to search',
  onSearch,
  setQuery,
  showSearchButton = true,
  largeSearch = true,
  exportButton
}: ModalProps) => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [queryVal, setQueryVal] = useState<string>('')

  useEffect(() => {
    setQuery ? setQuery(queryVal) : ''
  }, [queryVal])

  return (
    <Stack>

        <Stack direction={{base:'column', md:'row'}} justifyContent={'space-between'}>
        <InputGroup
          size='lg'
          width={{ sm: '100%', lg: largeSearch ? widthSize : '100%' }}
        >
          {filterBody && (
            <InputLeftAddon
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                onReset ? onReset(showFilter) : ''
                setShowFilter(!showFilter)
              }}
              borderColor={'gray'}
            >
              <Icon
                as={showFilter ? MdOutlineFilterListOff : LuListFilter}
                color={'secondary'}
                mr={1}
              />
              Filter
            </InputLeftAddon>
          )}
          {searchBody ? (
            searchBody
          ) : (
            <Input
              placeholder={placeholderTitle}
              value={queryVal}
              onChange={e => setQueryVal(e.target.value)}
            />
          )}

          {showSearchButton && (
            <InputRightAddon
              backgroundColor={'secondary'}
              borderColor={'secondary'}
              onClick={() => (onSearch && queryVal ? onSearch(queryVal) : '')}
            >
              <CustomButton
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                <Icon as={IoSearchSharp} mr={1.5} /> Search
              </CustomButton>
            </InputRightAddon>
          )}
        </InputGroup>
        {exportButton && (exportButton)}
        </Stack>
      {filterBody &&
        showFilter &&
        (isLoading ? <FormSkeleton /> : <Stack mt={5}>{filterBody}</Stack>)}
    </Stack>
  )
}

export default SearchInput

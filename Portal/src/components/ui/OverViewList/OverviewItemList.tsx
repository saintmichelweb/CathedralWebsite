import { ReactNode, useRef } from 'react'
import { Box, CardHeader, Heading, List, Stack } from '@chakra-ui/react'

import SearchInput from '../SearchInput/SearchInput'

interface ModalProps {
  title: string
  listBody: ReactNode
  showSearch?: boolean
  onSearch?: (query: string) => void
  setQuery?: (query: string) => void
  showSearchButton?: boolean
  largeSearch?: boolean
}
export const OverviewItemList = (props: ModalProps) => {
  const { title, listBody, showSearch = false, onSearch, showSearchButton, setQuery, largeSearch } = props
  const listRef = useRef(null)

  return (
    <>
      <Stack
        direction={{base:'column', lg:'row'}}
        sx={{ justifyContent: 'space-between', alignItems: {lg:'center'} }}
        pr={5}
        mt={2}
      >
        <CardHeader>
          <Heading size={{base:'sm', lg:'md'}}> {title}</Heading>
        </CardHeader>
        {showSearch && (
          <Box pl={{ base: 5, lg: 0 }}>
            <SearchInput
              widthSize={320}
              placeholderTitle='Search...'
              onSearch={onSearch}
              setQuery={setQuery}
              showSearchButton={showSearchButton}
              largeSearch={largeSearch}
            />
          </Box>
        )}
      </Stack>
      <List ref={listRef} sx={{ height: '80%', overflow: 'auto' }} mt={{ base: 4 }}>
        {listBody}
      </List>
    </>
  )
}

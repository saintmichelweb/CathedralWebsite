import { createColumnHelper } from '@tanstack/react-table'
import { Checkbox, Stack } from '@chakra-ui/react'
import camelCase from 'lodash.camelcase'

import { useRoles } from '@/api/hooks/roles'
import { useTable } from '@/hooks'
import { DataTable, EmptyState, TableSkeleton } from '@/components/ui'

const RoleManagementMapView = () => {
  const roles = useRoles()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor('action', {
      cell: info => info.getValue(),
      header: 'Action',
    }),
  ]

  let data

  if (roles.isSuccess && !roles.isFetching) {
    roles.data.data.forEach(role =>
      columns.push(
        columnHelper.accessor(camelCase(role.name), {
          cell: info => <Checkbox isChecked={info.getValue()} />,
          header: role.name,
        })
      )
    )

    data = roles.data.permissions.map(permission => {
      const permissionObj: Record<string, boolean> = {}
      roles.data.data.forEach(role => {
        permissionObj[camelCase(role.name)] = role.permissions? role.permissions.includes(permission) : false
      })

      return {
        action: permission,
        ...permissionObj,
      }
    })
  }

  const table = useTable({
    data: data || [],
    columns,
  })

  return (
    <Stack
      minH='full'
      bg='primaryBackground'
      pt='6'
      flexGrow='1'
    >

      {roles.isFetching && <TableSkeleton breakpoint='md' />}

      {data && (
        <>
          <DataTable table={table} breakpoint='md' alwaysVisibleColumns={[0]} />

          {data.length === 0 && (
            <EmptyState text='There are no roles right now.' mt='14' />
          )}
        </>
      )}
    </Stack>
  )
}

export default RoleManagementMapView

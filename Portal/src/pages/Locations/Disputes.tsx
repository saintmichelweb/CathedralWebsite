/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from 'react'
import { createColumnHelper, type PaginationState } from '@tanstack/react-table'
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import {
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    SimpleGrid,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BiSolidErrorCircle } from 'react-icons/bi'
import { GoChecklist } from 'react-icons/go'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import {
    DisputeStatus,
} from 'shared-lib'

import { DisputesCounts } from '@/types/dashboard'
import { SelectOption } from '@/types/forms'
import { GetReconciliationParams } from '@/types/reconciliations'
import {
    DashboardReconFilterForm,
    disputesFilterSchema,
    type DisputesFilterForm,
} from '@/lib/validations/listFilters'
import { formatTheDate, removeUnderscore } from '@/utils'
import { useTable } from '@/hooks'
import {
    CommonIcons,
    CustomButton,
    DataTable,
    EmptyState,
    OverviewPageCard,
    Skeleton,
    TableSkeleton,
} from '@/components/ui'
import SearchInput from '@/components/ui/SearchInput/SearchInput'
import { CustomFormSelect } from '@/components/form'
import { daysBetween } from '../../utils/index';
import { MdAdd } from 'react-icons/md'
import AddNewDisputes from './Components/AddDispute'
import CustomModal from '@/components/ui/CustomModal/CustomModal'
import { disputeType } from '@/types/disputes.ts'
import { getDisputes } from '@/api/disputes.ts'
import { getDFSPDropdown } from '@/api/hooks/dfsps'
import { useUserContext } from '@/contexts/UserContext'
import { DfspResponse } from '@/types/dfsps'
import { useNavigate } from 'react-router-dom'
import { fetchDisputesCounts } from '@/api/hooks/dashboard'
import moment from 'moment'

const DisputesStatuses = Object.values(DisputeStatus).map(value => ({
    value,
    label: removeUnderscore(value),
}))

const Disputes = () => {
    const { reset, handleSubmit, setValue, getValues } = useForm<DisputesFilterForm>(
        {
            resolver: zodResolver(disputesFilterSchema),
            defaultValues: {
                status: null,
            },
        }
    )
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
    })

    const { loggedUser } = useUserContext()
    const navigate = useNavigate()
    const [selectedDfsp, setSelectedDFsp] = useState<SelectOption | null>(null)
    const ignore = useRef(false)
    const { onOpen } = useDisclosure()
    const [disputesData, setDisputesData] = useState<disputeType[]>([])
    const [selectedDispute, setSelectedDispute] = useState<number | null>(null)
    const [isDisputeStatLoading, setIsDisputeStatLoading] = useState<boolean>(false)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [isDfspsLoading, setIsDfspsLoading] = useState<boolean>(false)
    const [dfspsData, setDfspsdata] = useState<DfspResponse[]>([])
    const [viewAddNewDisputesModal, setViewAddNewDisputesModal] = useState<boolean>(false)
    const [showStat, setShowStat] = useState<boolean | undefined>(true)
    const [searchOn, setSearchOn] = useState<boolean>(false)
    const [query, setQuery] = useState<string>('')
    const [selectedStatus, setSelectedStatus] = useState<SelectOption | null>(null)
    const [disputeCardData, setDisputeCardData] =useState<DisputesCounts | null>(null)
    const createdAtFrom = moment(Date.now()).format('YYYY-MM-DD')
    const createdAtTo = moment(Date.now()).format('YYYY-MM-DD')
    // const [selectedReason, setSelectedReason] = useState<SelectOption | null>(null)
    // const DisputesReasons = Object.values(DisputeReason).map(value => ({
    //     value,
    //     label: removeUnderscore(value),
    // }))

    const columns = useMemo(() => {
        const columnHelper = createColumnHelper<disputeType>()
        return [
            columnHelper.accessor('id', {
                cell: info => info.getValue(),
                header: 'Id',
            }),
            columnHelper.accessor('transaction.merchant_id', {
                cell: info => info.getValue(),
                header: 'Merchant Code',
            }),
            columnHelper.accessor('transaction.home_transaction_id', {
                cell: info => info.getValue(),
                header: 'Home Transaction Id',
            }),
            columnHelper.accessor('transaction.transfer_id', {
                cell: info => info.getValue(),
                header: 'Transfer Id',
            }),
            columnHelper.accessor('transaction.payer_fspId', {
                cell: info => info.getValue(),
                header: 'Payer Fsp Id',
            }),
            columnHelper.accessor('transaction.payee_fspId', {
                cell: info => info.getValue(),
                header: 'Payee Fsp Id',
            }),
            columnHelper.accessor('queue_name', {
                cell: info => info.getValue(),
                header: 'Queue Name',
            }),
            columnHelper.accessor('reason', {
                cell: info => info.getValue(),
                header: 'Reason',
            }),
            columnHelper.accessor('created_by.name', {
                cell: info => info.getValue(),
                header: 'Initiated By',
            }),
            columnHelper.accessor('created_at', {
                cell: info => formatTheDate(info.getValue()),
                header: 'Initiated At',
            }),
            columnHelper.display({
                id: 'days-passed',
                header: 'Days Passed',
                cell: ({row}) => daysBetween(row.original.created_at, Date.now()),
                enableSorting: false,
              }),
            columnHelper.accessor('status', {
                cell: info => {
                    const status = info.getValue()
                    let statusIcon
                    switch (status) {
                        case DisputeStatus.IN_PROGRESS:
                            statusIcon = <WarningIcon color='yellow.500' />
                            break
                        case DisputeStatus.OPEN:
                            statusIcon = <WarningIcon color='red.500' />
                            break
                        case DisputeStatus.SETTLED:
                            statusIcon = <CheckCircleIcon color='green.500' />
                            break
                        case DisputeStatus.CLOSED:
                            statusIcon = <CheckCircleIcon color='green.500' />
                            break
                        default:
                            statusIcon = <WarningIcon color='yellow.500' />
                    }
                    return (
                        <Flex alignItems='center' justifyContent='center'>
                            {statusIcon}
                            <Text ml={2}>{removeUnderscore(status)}</Text>
                        </Flex>
                    )
                },
                header: 'Status',
            }),
            columnHelper.display({
                id: 'action',
                cell: ({row}) => {
                    const id = row.original.id
                    return (
                        <HStack justify='center'>
                            {/* <Menu autoSelect={false} offset={[-110, -5]}>
                                <MenuButton>
                                    <Icon as={MdMoreVert} color={'black'} boxSize={7} />
                                </MenuButton>
                                <MenuList minW='0'>
                                    <MenuItem> */}
                            <CustomButton
                                onClick={() => {
                                    navigate(`/disputes/${id}`)
                                }}
                                mt={{ base: '2', lg: '0' }}
                                mr={{ base: '-2', lg: '0' }}
                                w={'full'}
                                leftIcon={<CommonIcons iconName='viewDetails' />}
                            >
                                View more
                            </CustomButton>
                            {/* </MenuItem>
                                    <MenuItem>
                                        <CustomButton
                                            onClick={() => {
                                                setSelectedDispute(id)
                                                setViewAddNewDisputesModal(true)
                                            }}
                                            mt={{ base: '2', lg: '0' }}
                                            mr={{ base: '-2', lg: '0' }}
                                            colorVariant='info-outline'
                                            variant='contained'
                                            w={'full'}
                                            leftIcon={<CommonIcons iconName='edit' />}
                                        >
                                            Edit
                                        </CustomButton>
                                    </MenuItem>
                                </MenuList>
                            </Menu> */}
                        </HStack>
                    )
                },
                header: 'Action',
                enableSorting: false,
            }),
        ]
    }, [onOpen])


    const fetchDisputes = async (params: GetReconciliationParams) => {
        try {
            setLoading(true)
            const response = await getDisputes({
                page: params.page,
                dfspId: getValues('dfspId'),
                search: params.search,
                status: getValues('status'),
            })
            if (response) {
                setDisputesData(response.data)
                setTotalPages(response.totalPages)
            }
        } catch (error) {
            setDisputesData([])
            console.error('Error fetching disputes:', error)
        } finally {
            setLoading(false)
        }
    }


    const onFilter = () => {
        fetchDisputes({
            page: 1,
        })
    }

    const fetchDfsps = async () => {
        setIsDfspsLoading(true)
        await getDFSPDropdown()
            .then(response => {
                setDfspsdata(response.data)
            })
            .catch(error => {
                console.log('Error: fetching dfsps ', error)
            })
            .finally(() => {
                setIsDfspsLoading(false)
            })
    }

    const fetchDisputesStat = async (params: DashboardReconFilterForm) => {
        setIsDisputeStatLoading(true)
        await fetchDisputesCounts(params)
          .then(response => {
            setDisputeCardData(response.data)
          })
          .catch(error => {
            console.log('Error: fetching disputes counts ', error)
          })
          .finally(() => {
            setIsDisputeStatLoading(false)
          })
      }

    const filterBody = (
        <Stack
            as='form'
            spacing='8'
            data-testid='filter-form'
            onSubmit={handleSubmit(onFilter)}
        >
            <SimpleGrid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                    xl: 'repeat(4, 1fr)',
                }}
                columnGap='4.5rem'
                rowGap={{ base: '4', sm: '3' }}
                justifyItems='start'
            >

                <CustomFormSelect
                    label='Status'
                    placeholder='Choose status'
                    options={DisputesStatuses}
                    selectValue={selectedStatus}
                    onChangeFn={(selectedStatusVal: SelectOption | null) => {
                        setSelectedStatus(selectedStatusVal)
                        if (selectedStatusVal) {
                            setValue('status', selectedStatusVal.value.toString())
                        }
                    }}
                />
                {(loggedUser?.role?.permissions?.includes('View DFSPs') ||
                    loggedUser?.role.name == 'Hub Super Admin') && (
                        <>
                            <CustomFormSelect
                                label='DFSP'
                                placeholder='Select payer fsp'
                                selectValue={selectedDfsp}
                                options={dfspsData.map(e => ({
                                    label: `${e.fspId} (${e.name})`,
                                    value: e.fspId,
                                }))}
                                onChangeFn={selectedVal => {
                                    setSelectedDFsp(selectedVal)
                                    if (selectedVal) {
                                        setValue('dfspId', selectedVal.value.toString())
                                    }
                                }}
                            />
                        </>
                    )}
                <HStack alignSelf='end' gap='3'>
                    <CustomButton
                        colorVariant='accent-outline'
                        mb='1'
                        minW={'7.5rem'}
                        onClick={() => {
                            reset()
                            setSelectedStatus(null)
                            setSelectedDFsp(null)
                            fetchDisputes({ page: 1 })
                        }}
                    >
                        Clear
                    </CustomButton>

                    <CustomButton type='submit' mb='1' minW={'7.5rem'}>
                        Filter
                    </CustomButton>
                </HStack>
            </SimpleGrid>
        </Stack>
    )

    const table = useTable({
        data: disputesData || [],
        columns,
        pagination,
        setPagination,
    })

    const onPageChange = (currentPageVal: number) => {
        fetchDisputes({
            page: currentPageVal,
        })
    }

    useEffect(() => {
        if (ignore.current) {
            return
        }
        ignore.current = true
        fetchDfsps()
        fetchDisputes({
            page: 1,
        })
        fetchDisputesStat({ createdAtFrom, createdAtTo })
    }, [])

    const onSearchFn = async (query: string) => {
        fetchDisputes({
            page: 1,
            search: query,
        })
    }

    useEffect(() => {
        if (!query && searchOn) {
            fetchDisputes({
                page: 1,
            })
            setSearchOn(false)
        }
    }, [query, searchOn])

    const onClose = () => {
        setViewAddNewDisputesModal(false)
    }
    // useEffect(() => {
    //     if (uploadBatchFile.isSuccess) {
    //         fetchDisputes({ page: 1 })
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [uploadBatchFile])

    return (
        <Stack minH='full' px={{ base: '4', sm: '6', lg: '8' }} pt='0' >
            <Flex justify='space-between' mb={4} mt={7}>
                <Heading size='md' mt={3} ml={0}>
                    Disputes
                </Heading>
                <CustomButton type='button' mb='1' minW={'7.5rem'} onClick={() => setViewAddNewDisputesModal(true)}>
                    {<Icon as={MdAdd} color={'white'} mr={1} boxSize={6} />}New Dispute
                </CustomButton>
            </Flex>
            <SimpleGrid
                spacing={{ base: 4, sm: 18, lg: 4 }}
                templateColumns={{
                    sm: 'repeat(auto-fill, minmax(50%, 1fr))',
                    lg: 'repeat(auto-fill, minmax(40%, 1fr))',
                    xl: 'repeat(auto-fill, minmax(19%, 1fr))',
                }}
                my={3}
            // hidden={!showStat}
            >
                {isDisputeStatLoading ? (
                    <Stack>
                        <Skeleton height='6.7rem' borderRadius={8} />
                    </Stack>
                ) : (
                    <OverviewPageCard
                        mainTitle={`Only today's records`}
                        title='Total'
                        totalNumber={disputeCardData?.allDisputesCount}
                        iconName={GoChecklist}
                        iconColor='info'
                        dividerColer='info'
                    />
                )}

                {isDisputeStatLoading ? (
                    <Stack>
                        <Skeleton height='6.7rem' borderRadius={8} />
                    </Stack>
                ) : (
                    <OverviewPageCard
                        mainTitle={`Only today's records`}
                        title='Open'
                        totalNumber={disputeCardData?.openDisputesCount}
                        iconName={BiSolidErrorCircle}
                        iconColor='danger'
                        dividerColer='danger'
                    />
                )}
                {isDisputeStatLoading ? (
                    <Stack>
                        <Skeleton height='6.7rem' borderRadius={8} />
                    </Stack>
                ) : (
                    <OverviewPageCard
                        mainTitle={`Only today's records`}
                        title='Progress'
                        totalNumber={disputeCardData?.inProgressDisputesCount}
                        iconName={IoCheckmarkDoneCircle}
                        iconColor='accent'
                        dividerColer='accent'
                    />
                )}
                {isDisputeStatLoading ? (
                    <Stack>
                        <Skeleton height='6.7rem' borderRadius={8} />
                    </Stack>
                ) : ( 
                    <OverviewPageCard
                        mainTitle={`Only today's records`}
                        title='Settled'
                        totalNumber={disputeCardData?.settledDisputesCount}
                        iconName={IoCheckmarkDoneCircle}
                        iconColor='success'
                        dividerColer='success'
                    />
                )}
                
                {isDisputeStatLoading ? (
                    <Stack>
                        <Skeleton height='6.7rem' borderRadius={8} />
                    </Stack>
                ) : (
                    <OverviewPageCard
                        mainTitle={`Only today's records`}
                        title='Closed'
                        totalNumber={disputeCardData?.closedDisputesCount}
                        iconName={IoCheckmarkDoneCircle}
                        iconColor='success'
                        dividerColer='success'
                    />
                )}
            </SimpleGrid>
            <Stack mt={showStat ? 0 : 3}>
                <SearchInput
                    filterBody={filterBody}
                    onReset={filterOnVal => {
                        reset()
                        setShowStat(filterOnVal)
                        setSelectedStatus(null)
                        setQuery('')
                        setSearchOn(false)
                    }}
                    setQuery={setQuery}
                    widthSize={'49.1%'}
                    isLoading={isDfspsLoading}
                    onSearch={(query: string) => {
                        onSearchFn(query)
                        setSearchOn(true)
                    }}
                />
            </Stack>

            <Box
                bg='primaryBackground'
                mx={{ base: '-4', sm: '-6', lg: '-8' }}
                mt='5'
                pt='0'
                px='4'
                flexGrow='1'
            >
                <DataTable
                    table={table}
                    totalPages={totalPages}
                    breakpoint='xl'
                    alwaysVisibleColumns={[0]}
                    onFetch={onPageChange}
                    useCustomPagination
                />

                {/* Show "No logs" message */}
                {!loading && disputesData?.length === 0 && (
                    <EmptyState text='There are no Disputes.' mt='10' />
                )}

                {/* Show TableSkeleton while fetching data */}
                {loading && <TableSkeleton breakpoint='xl' mt={{ base: '3', xl: '4' }} />}
            </Box>
            <CustomModal
                headerTitle={`${selectedDispute == null ? 'Add New Dispute' : 'Update Dispute'}`}
                isOpen={viewAddNewDisputesModal}
                onClose={() => {
                    onClose()
                }}
                child={
                    <AddNewDisputes onClose={onClose} fetchDisputes={() => fetchDisputes({
                        page: 1,
                    })} disputeId={selectedDispute} />
                }
                isCentered
                scrollInside={false}
                widthSize='25vw'
                showFooter={false}
                isLoading={loading}
            />
        </Stack>
    )
}

export default Disputes

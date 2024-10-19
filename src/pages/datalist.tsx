import { useQuery } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '../../components/Layout'
import CustomTable from '../../components/tables/table'
import { useState } from 'react'

interface DataItem {
  id: number
  customer_name: string
  email: string
  signup_date: string
  last_activity: string
}

const fetchData = async (): Promise<DataItem[]> => {
  const response = await fetch('http://localhost:3000/api/dataList')
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const {
    data = [] as DataItem[],
    isLoading,
    isError,
  } = useQuery<DataItem[]>({
    queryKey: ['dataList'],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })

  const notify = () => toast('Error fetching data', { type: 'error' })

  if (isError) {
    notify()
  }

  const filteredData = data.filter(
    (item) =>
      item.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns = [
    {
      Header: 'ID',
      accessor: 'id' as const,
    },
    {
      Header: 'Customer Name',
      accessor: 'customer_name' as const,
    },
    {
      Header: 'Email',
      accessor: 'email' as const,
    },
    {
      Header: 'Signup Date',
      accessor: 'signup_date' as const,
    },
    {
      Header: 'Last Activity',
      accessor: 'last_activity' as const,
      Cell: ({ value }: { value: string }) => (
        <span className='text-black'>{value.slice(0, 10)}</span>
      ),
    },
  ]

  return (
    <Layout>
      <div className='border border-gray-300 rounded-2xl w-[100%]'>
        <h1 className='text-xl text-[#c1cf16] font-bold p-5 bg-[#1C2834] rounded-t-2xl'>
          Data list overview
        </h1>
        <div className='border-t-[1px] border-gray-300' />
        <div className='mt-0 p-5 w-[100%]'>
          <input
            type='text'
            placeholder='Search by name or email'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='border border-gray-400 rounded  p-3 2xl:w-[50%] w-[100%] mb-5'
          />
          <CustomTable
            data={filteredData}
            loading={isLoading}
            columns={columns}
            itemsPerPage={10}
          />
        </div>
      </div>
      <ToastContainer />
    </Layout>
  )
}

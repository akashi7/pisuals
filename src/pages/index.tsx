import { useQuery } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import VisitedDataGraph from '../../components/analytics/analytics'
import Layout from '../../components/Layout'
import VisitedData from '../../components/visitData/visitedData'

interface DataItem {
  id: number
  pageView: number
  visitors: number
  rate: number
  duration: number
  date: string
}

const fetchVisitData = async (): Promise<DataItem[]> => {
  const response = await fetch('http://localhost:3000/api/visitData')
  if (!response.ok) {
    throw new Error('Failed to fetch visit data')
  }
  return response.json()
}

export default function Home() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<DataItem[], Error>({
    queryKey: ['visitData'],
    queryFn: fetchVisitData,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })

  const notify = () => toast('Error fetching data', { type: 'error' })

  if (isError) {
    notify()
  }

  return (
    <Layout>
      <VisitedData data={data} loading={isLoading} />
      <VisitedDataGraph data={data} loading={isLoading} />
      <ToastContainer />
    </Layout>
  )
}

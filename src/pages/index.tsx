import { useQuery } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import VisitedDataGraph from '../../components/analytics/analytics'
import Layout from '../../components/Layout'
import VisitedData from '../../components/visitData/visitedData'
import { fetchVisitData, VistDataItem } from '../../services/service'

export default function Home() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<VistDataItem[], Error>({
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

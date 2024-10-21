import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { VistDataItem } from '../../services/service'
import { GeneralContentLoader } from '../common/loader'

interface VisitedDataProps {
  data: VistDataItem[]
  loading: boolean
}

const VisitedDataGraph = ({ data, loading }: VisitedDataProps) => {
  if (loading) {
    return <GeneralContentLoader />
  }

  return (
    <div>
      <div className='border border-gray-300 rounded-2xl'>
        <h2 className=' text-xl text-[#c1cf16] font-bold p-5 bg-[#1C2834] rounded-t-2xl'>
          Page views and visitors
        </h2>
        <div className='border-t-[1px] border-gray-300' />
        <div className='mt-5 p-5'>
          <ResponsiveContainer width='100%' height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='pageView' fill='#8884d8' name='Page Views' />
              <Bar dataKey='visitors' fill='#82ca9d' name='Visitors' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='border border-gray-300 rounded-2xl mt-5'>
        <h2 className=' text-xl text-[#c1cf16] font-bold p-5 bg-[#1C2834] rounded-t-2xl'>
          Visit duration and bounce rate
        </h2>
        <div className='border-t-[1px] border-gray-300' />
        <div className='mt-5 p-5'>
          <ResponsiveContainer width='100%' height={400}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='duration'
                stroke='#8884d8'
                name='Duration'
              />
              <Line
                type='monotone'
                dataKey='rate'
                stroke='#82ca9d'
                name='Rate'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default VisitedDataGraph

import { GeneralContentLoader } from '../common/loader'

interface Data {
  id: number
  pageView: number
  visitors: number
  rate: number
  duration: number
  date: string
}

interface VisitedDataProps {
  data: Array<Data>
  loading: boolean
}

const VisitedData: React.FC<VisitedDataProps> = ({ data, loading }) => {
  const totalVisitors =
    data.length && data.reduce((acc, day) => acc + day.visitors, 0)
  const averageBounceRate =
    data.length && data.reduce((acc, day) => acc + day.rate, 0) / data.length

  const averageSessionDuration =
    data.length &&
    data.reduce((acc, day) => acc + day.duration, 0) / data.length

  if (loading) {
    return <GeneralContentLoader />
  }

  return (
    <div className='mb-5'>
      <div className='border border-gray-300 rounded-2xl'>
        <h1 className='text-xl text-[#c1cf16] font-bold p-5 bg-[#1C2834] rounded-t-2xl'>
          Website visit overview
        </h1>
        <div className='border-t-[1px] border-gray-300' />
        <div className='mt-5 p-5'>
          <div className='flex flex-row items-center gap-5 mb-1'>
            <p className='w-[250px] font-bold'>Total Visitors</p>
            <p className='text-black'>{totalVisitors}</p>
          </div>
          <div className='flex flex-row items-center gap-5 mb-1'>
            <p className='w-[250px] font-bold'>Average Bounce Rate</p>
            <p className='text-black'>{averageBounceRate.toFixed(1)}%</p>
          </div>
          <div className='flex flex-row items-center gap-5 mb-1'>
            <p className='w-[250px] font-bold'>Average Session Duration</p>
            <p className='text-black'>{averageSessionDuration.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisitedData

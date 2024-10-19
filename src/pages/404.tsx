import Layout from '../../components/Layout'

const NotFound = () => {
  return (
    <Layout>
      <div className='w-full h-screen grid place-items-center bg-red-400'>
        <div className='text-center'>
          <h1 className='text-[160px] font-bold text_404'>404</h1>
          <p className='text-[16px] text-gray-500'>Page not found</p>
        </div>
      </div>
    </Layout>
  )
}

export default NotFound

import { ReactNode, FC } from 'react'

interface ContentProps {
  children: ReactNode
}

const Content: FC<ContentProps> = ({ children }) => {
  return (
    <div className=' lg:p-5 p-1 overflow-y-auto h-[100%] scroll '>
      {children}
    </div>
  )
}

export default Content

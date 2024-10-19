import { FC, ReactNode, useState, Fragment } from 'react'
import Content from './content'
import NavBar from './navBar'
import Sidebar from './sidebar'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  return (
    <Fragment>
      <Drawer open={isOpen} onClose={toggleDrawer} direction='left'>
        <Sidebar isMobile={true} />
      </Drawer>
      <section className='flex bg-white w-[100%] h-screen overflow-y-hidden'>
        <Sidebar />
        <div className='flex-1 h-[100%] flex flex-col mb-16'>
          <NavBar toggleDrawer={toggleDrawer} />
          <Content>{children}</Content>
        </div>
      </section>
    </Fragment>
  )
}

export default Layout

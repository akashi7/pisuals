import { FC, ReactElement } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { MdMenuOpen } from 'react-icons/md'

interface NavBarProps {
  toggleDrawer: () => void
}

const NavBar: FC<NavBarProps> = ({ toggleDrawer }): ReactElement => {
  return (
    <nav
      className={`p-5 flex  w-[100%]   justify-between items-center border-b border-gray-300`}
    >
      <MdMenuOpen
        size={25}
        className='text-[#C1CF16] block lg:hidden'
        onClick={toggleDrawer}
      />
      <div className='flex items-center gap-2'>
        <FaRegUser />
        <p className=''>Test</p>
      </div>
    </nav>
  )
}

export default NavBar

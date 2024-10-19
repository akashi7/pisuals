import { useRouter } from 'next/router'
import { FC, ReactElement, cloneElement } from 'react'
import { MdDataExploration } from 'react-icons/md'
import { SiGoogleanalytics, SiPlausibleanalytics } from 'react-icons/si'

interface SidebarItemProps {
  icon: ReactElement
  text: string
  url: string
}

const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  text,
  url,
}): ReactElement => {
  const router = useRouter()

  const isMatch = router.pathname === url

  const handleClick = (): void => {
    router.push(url)
  }

  return (
    <div
      className={`flex flex-row gap-5 items-center mb-5 ${
        isMatch ? '' : ''
      } cursor-pointer p-3 rounded-lg w-full`}
      onClick={handleClick}
    >
      {cloneElement(icon, {
        color: isMatch ? '#C1CF16' : 'white',
      })}
      <p
        className={`${
          isMatch ? ' font-bold ' : ' font-medium'
        }  text-base text-white`}
      >
        {text}
      </p>
    </div>
  )
}

interface SideBarProps {
  isMobile?: boolean
}

const Sidebar: FC<SideBarProps> = ({ isMobile }): ReactElement => {
  return (
    <section
      className={` ${
        isMobile
          ? 'block '
          : 'w-[300px] hidden lg:flex border-r border-gray-100  '
      }    h-[100%] flex-col py-4 px-5 bg-[#1C2834] `}
    >
      <div className='flex pl-3 flex-row items-center gap-2 mb-8'>
        <SiPlausibleanalytics size={50} color='#C1CF16' />
        <h1 className='text-2xl  text-[#C1CF16] font-bold '>PISUALS</h1>
      </div>
      <div className='mt-0 w-full'>
        <>
          <SidebarItem
            icon={<SiGoogleanalytics size={30} />}
            text='Analytics'
            url='/'
          />
          <SidebarItem
            icon={<MdDataExploration size={30} />}
            text='Data list'
            url='/datalist'
          />
        </>
      </div>
    </section>
  )
}

export default Sidebar

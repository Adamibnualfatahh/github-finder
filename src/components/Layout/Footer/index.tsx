import Link from 'next/link'
import React, { FC } from 'react'

type FooterProps = {}

const socialMediaList = [
  {
    id: 1,
    name: 'Github',
    logo: '',
    url: '',
  },
  {
    id: 2,
    name: 'linkedin',
    logo: '',
    url: '',
  },
  {
    id: 3,
    name: 'instagram',
    logo: '',
    url: '',
  },
]

const year = new Date().getFullYear()

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className='w-full flex justify-center page-format   h-max bottom-4  z-20 px-4'>
      <div className='width-cap h-full w-full rounded-xl p-4 flex items-center bg-white justify-between'>
        <div className='lg:w-full min-w-max lg:flex justify-center items-center gap-6'>
          <Link
            href={'https://www.adamibnu.com'}
            className='text-[#B2B2B2]'
            target='_blank'
          >
            {year} || Adam Ibnu
          </Link>
        </div>
        <div className=' w-full hidden lg:flex justify-center items-center gap-6'>
          {socialMediaList.map((data, _i) => (
            // eslint-disable-next-line react/jsx-key
            <Link
              href={data.url}
              className='text-sm 2xl:text-lg text-black font-medium'
            >
              {data.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer

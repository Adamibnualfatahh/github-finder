import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

type SearchBarProps = {
  onUsernameChange: (username: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ onUsernameChange }) => {
  const router = useRouter()
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    // Ambil nilai username dari query parameter dan atur state
    const usernameFromQuery = router.query.username as string
    if (usernameFromQuery) {
      setUsername(usernameFromQuery)
    }
  }, [router.query.username])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const formattedUsername = username.trim()
      onUsernameChange(formattedUsername)

      router.push({
        pathname: router.pathname,
        query: { ...router.query, username: formattedUsername },
      })
    }
  }

  return (
    <div className='mx-auto pt-12 pb-2 w-full md:max-w-md px-4 md:px-0'>
      <div className='relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden'>
        <div className='grid place-items-center h-full w-12 text-gray-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
        <input
          className='peer h-full w-full outline-none text-sm text-gray-700 pr-2'
          type='text'
          id='search'
          placeholder='Enter GitHub username and press Enter'
          value={username}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}

export default SearchBar

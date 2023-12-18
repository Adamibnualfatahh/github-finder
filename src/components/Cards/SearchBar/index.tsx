import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

type SearchBarProps = {
  onUsernameChange: (username: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ onUsernameChange }) => {
  const router = useRouter()
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
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
      search()
    }
  }

  const search = () => {
    const formattedUsername = username.trim()
    onUsernameChange(formattedUsername)

    router.push({
      pathname: router.pathname,
      query: { ...router.query, username: formattedUsername },
    })
  }

  return (
    <div className='mx-auto pt-12 pb-2 w-full md:max-w-md px-4 md:px-0 bg-blend-darken'>
      <label
        className='mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300'
        htmlFor='search-bar'
      >
        <input
          type='text'
          id='search'
          placeholder='Enter GitHub username and press Enter'
          value={username}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className='px-6 py-2 w-full rounded-md flex-1 outline-none bg-white text-gray-600 text-sm font-semibold'
          required
        />
        <button
          onClick={search}
          className='w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all'
        >
          <div className='flex items-center transition-all opacity-1'>
            <span className='text-sm font-semibold whitespace-nowrap truncate mx-auto'>
              Search
            </span>
          </div>
        </button>
      </label>
    </div>
  )
}

export default SearchBar

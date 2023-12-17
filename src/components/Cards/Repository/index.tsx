import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const RepositoryList: React.FC = () => {
  const router = useRouter()
  const { username } = router.query

  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [languages, setLanguages] = useState<Record<string, number>>({})
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filter, setFilter] = useState<string | null>(null)
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])

  useEffect(() => {
    if (username) {
      setLoading(true)
      setError(false)

      axios
        .get(`/api/github/users?username=${username}`)
        .then((res) => {
          setProfile(res.data)
          setLoading(false)
        })
        .catch((err) => {
          setError(true)
          setLoading(false)
        })

      axios
        .get(`/api/github/users?username=${username}/repos?per_page=1000`)
        .then((res) => {
          const repos = res.data

          if (Array.isArray(repos) && repos.length > 0) {
            setProfile({ ...profile, repos: repos })
            setLoading(false)
          } else {
            setError(true)
            setLoading(false)
          }
        })
        .catch((err) => {
          setError(true)
          setLoading(false)
        })
    }
  }, [username])

  useEffect(() => {
    if (profile && profile.repos) {
      const languages = profile.repos
        .flatMap((repo: any) => repo.language || []) // Handle the case where language is null
        .filter((language: string, index: number, self: string[]) => {
          return language && self.indexOf(language) === index
        })
      setAvailableLanguages(languages)
    }
  }, [profile])

  const filteredRepos =
    profile?.repos?.filter((repo: any) => {
      if (filter && (repo.language || '') !== filter) {
        // Handle the case where language is null
        return false
      }

      if (!repo.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      return true
    }) || []

  const reposCount = filteredRepos?.length || 0

  if (!username) return null
  if (error || !profile || !profile.repos) return null

  return (
    <div className='bg-gray-800 ml-0 md:ml-4 mt-4 md:mt-0 rounded-2xl p-4'>
      <div className='flex'>
        <h2 className='font-bold text-xl'>Projects</h2>
        <span className='py-1 px-2 bg-gray-700 ml-2 rounded-xl'>
          {reposCount}
        </span>
      </div>

      <div className='py-2 w-full md:px-0'>
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
            id='searchRepository'
            placeholder='Search repository..'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className='grid grid-cols-4 md:grid-cols-8 gap-2'>
        <div className='col-span-full md:col-span-4 lg:col-span-8'>
          <h2>Filters:</h2>
          <div className='flex flex-wrap gap-2'>
            {availableLanguages.map((language) => (
              <div
                key={language}
                className={`bg-gray-600 text-center max-w-md rounded-xl p-2 text-sm cursor-pointer ${
                  filter === language ? 'bg-blue-500' : ''
                }`}
                onClick={() =>
                  setFilter((prevFilter) =>
                    prevFilter === language ? null : language,
                  )
                }
              >
                {language}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-2'>
        {filteredRepos?.map((repo: any) => (
          <div key={repo.id} className='w-full'>
            <a
              href={repo.html_url}
              className='w-full h-32 rounded-xl border-2 border-gray-600 flex px-2 my-2 py-2 hover:bg-gray-700'
            >
              <div className='flex flex-col justify-center ml-2 w-full'>
                <div className='flex items-center'>
                  <p className='text-gray-200 text-sm font-semibold'>
                    {repo.name}
                  </p>
                </div>
                <p className='text-gray-200 text-xs'>{repo.description}</p>
                <div className='grid grid-cols-2 mt-2'>
                  <div className='flex items-center gap-1'>
                    {repo.language && (
                      <span className='text-gray-400 text-xs bg-gray-600 p-1 rounded-xl'>
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <div className='flex items-center gap-2 ml-auto'>
                    <div className='flex items-center'>
                      <svg
                        className='w-4 h-4 text-gray-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 21 20'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z'
                        />
                      </svg>
                      <span className='text-gray-400 text-xs px-2'>
                        {repo.stargazers_count}
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <svg
                        className='w-4 h-4 text-gray-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 14 20'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='1'
                          d='M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6-3.976-2-.01A4.015 4.015 0 0 1 3 7m10 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'
                        />
                      </svg>
                      <span className='text-gray-400 text-xs px-2'>
                        {repo.forks}
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <svg
                        className='w-4 h-4 text-gray-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 20 14'
                      >
                        <path d='M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z' />
                      </svg>
                      <span className='text-gray-400 text-xs px-2'>
                        {repo.watchers_count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RepositoryList

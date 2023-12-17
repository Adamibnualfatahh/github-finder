import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import RepositoryList from '@/components/Cards/Repository'
import { useRouter } from 'next/router'
type Languages = {}

const LanguageList: FC<Languages> = ({}) => {
  const router = useRouter()
  const { username } = router.query

  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [languages, setLanguages] = useState<Record<string, number>>({})

  useEffect(() => {
    if (username) {
      setLoading(true)
      setError(false)

      axios
        .get(`https://api.github.com/users/${username}`)
        .then((res) => {
          setProfile(res.data)
          setLoading(false)
        })
        .catch((err) => {
          setError(true)
          setLoading(false)
        })

      axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((res) => {
          const repos = res.data
          const languageCounts: Record<string, number> = {}

          repos.forEach((repo: any) => {
            const language = repo.language

            if (language) {
              if (languageCounts[language]) {
                languageCounts[language]++
              } else {
                languageCounts[language] = 1
              }
            }
          })

          setLanguages(languageCounts)
          setLoading(false)
        })
        .catch((err) => {
          setError(true)
          setLoading(false)
        })
    }
  }, [username])

  if (!username) return null
  if (loading) return <p>Loading...</p>

  if (error || !profile) return null

  return (
    <div className='w-full md:w-2/3 flex-col md:flex-row'>
      <div className='bg-gray-800 ml-0 md:ml-4 mt-4 mb-4 md:mt-0  rounded-2xl p-4'>
        <div className='flex'>
          <h2 className='font-bold text-xl'>Languages</h2>
          <span className='py-1 px-2  bg-gray-700 ml-2 rounded-xl'>
            {Object.keys(languages).length}
          </span>
        </div>
        <div className='grid grid-cols-3 md:grid-cols-6 gap-4 mt-2'>
          {Object.entries(languages).map(([language, count]) => (
            <div key={language} className='w-full'>
              <div className='flex flex-col items-center justify-center'>
                <div className='w-32 h-32 rounded-full border-dashed border-2 flex items-center justify-center'>
                  <div className='text-gray-200 text-sm mt-2'>{language}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RepositoryList />
    </div>
  )
}

export default LanguageList

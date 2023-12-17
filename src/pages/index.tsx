import Image from 'next/image'
import SearchBar from '@/components/Cards/SearchBar'
import LanguageList from '@/components/Cards/Languanges'
import React from 'react'
import Profile from '@/components/Cards/Profiles'
import '@/styles/globals.css'
import Head from 'next/head'

export default function Home() {
  const handleUsernameChange = (formattedUsername: string) => {
    const username = formattedUsername.replace('?username=', '')
  }
  return (
    <main>
      <Head>
        <title>Profile Search</title>
        <meta property='og:title' content='Profile Search' key='title' />
        <meta name='description' content='Search Github Profile' />
        <meta
          property='og:description'
          content='Search Github Profile'
          key='description'
        />
        <meta name='keywords' content='Github, Profile, Search' />
        <meta name='author' content='Adam Ibnu' />
        <meta property='og:adamibnu' content='Github Profile' />
      </Head>
      <SearchBar onUsernameChange={handleUsernameChange} />
      <div className='flex flex-col md:flex-row top-0 z-10 p-4 w-full'>
        <Profile />
        <LanguageList />
      </div>
    </main>
  )
}

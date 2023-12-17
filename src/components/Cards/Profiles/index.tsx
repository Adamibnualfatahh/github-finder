import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Profile = () => {
  const router = useRouter()
  const { username } = router.query

  const [profile, setProfile] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(false)

  React.useEffect(() => {
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
    }
  }, [username])

  if (!username) return (
      <div className='w-full h-screen flex justify-center items-center bg-gray-900 rounded-xl'>
          <div className='animate-pulse text-center'>
                <h1 className='text-2xl font-bold'>Please Input Username</h1>
                <p className='text-gray-400 text-sm'>Example: adamibnualfatahh</p>
          </div>
      </div>
  )

  if (loading) return (
     <div className='w-full h-screen flex justify-center items-center bg-gray-900 rounded-xl'>
          <div className='text-center'>
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>

          </div>
      </div>
  )

  if (error || !profile)
    return (
        <div className='w-full h-screen flex justify-center items-center bg-gray-900 rounded-xl'>
            <div className='text-center'>
                <h1 className='text-2xl font-bold'>Humm... User not found!</h1>
                <p className='text-gray-400'>Please Input Correct Username</p>
            </div>
        </div>
    )

  return (
    <div className='w-full md:w-1/3'>
      <div className='bg-gray-800 border border-gray-800 shadow-lg rounded-2xl p-4'>
        <div className='flex'>
          <div className='h-32 w-32'>
            <img
              src={profile.avatar_url}
              alt='aji'
              className='w-32 h-32 object-cover rounded-2xl'
            />
          </div>
          <div className='flex-auto ml-5'>
            <div className='flex items-center justify-between sm:mt-2'>
              <div className='flex items-center'>
                <div className='flex flex-col'>
                  <a
                    href={profile.html_url}
                    target='_blank'
                    className='w-full flex-none text-lg text-gray-200 font-bold leading-none'
                  >
                    {profile.name}
                  </a>
                  <div className='flex-auto text-gray-400 my-1'>
                    <span className='mr-3'>{profile.login}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-row items-center'>
              {profile.twitter_username && (
                <div className='inline-flex pr-2'>
                  <a
                    href={'https://twitter.com/' + profile.twitter_username}
                    aria-label='twitter'
                    target='_blank'
                  >
                    <svg
                      className='w-4 h-4 text-gray-400'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fill='currentColor'
                        d='M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z'
                      />
                    </svg>
                  </a>
                </div>
              )}
              <div className='inline-flex pr-2'>
                <a href={profile.html_url} aria-label='github' target='_blank'>
                  <svg
                    className='w-4 h-4 text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className='flex-auto pt-2 text-sm text-gray-400 max-w-md'>
              <span className='mr-3'>{profile.followers} Followers</span>
              <span className='mr-3 border-r border-gray-600  max-h-0'></span>
              <span>{profile.following} Following</span>
            </div>
          </div>
        </div>
      </div>
      {profile.bio || profile.location || profile.blog ? (
        <>
          <div className='bg-gray-800 border border-gray-800 shadow-lg rounded-2xl p-4 mt-4'>
            <h2 className='font-bold text-xl'>About</h2>
            {profile.bio && (
              <>
                {profile.bio}
                <div className='w-full h-1 bg-gray-700 mt-2 mb-2'></div>
              </>
            )}

            <div className='flex items-center mt-2'>
              <svg
                className='w-4 h-4 text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 16 20'
              >
                <path d='M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z' />
              </svg>
              <p className='ml-2 text-sm text-gray-500'>{profile.location}</p>
            </div>
            {profile.blog && (
              <div className='flex items-center mt-2'>
                <svg
                  className='w-4 h-4 text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 19 19'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7'
                  />
                </svg>
                <a
                  href={profile.blog}
                  target='_blank'
                  className='ml-2 text-sm text-gray-500'
                >
                  {profile.blog}
                </a>
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Profile

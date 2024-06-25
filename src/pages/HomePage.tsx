import React, { useCallback, useEffect, useState } from 'react'
import { PostService } from '../services/post-service'
import MainPostList from '../components/templates/MainPostList'
import { useQuery } from 'react-query'
import { useSession } from '../hooks/auth'

const HomePage = () => {
  // const [posts, setPosts] = useState<PostDisplayType[]>([])
  const { session } = useSession()

  const fetchPostings = useCallback(async () => {
    if (session) {
      const res = await PostService.GetPosts('userId', session.user.id)
      return res
    }
  }, [session])

  const {
    data: posts,
    isError,
    isLoading,
    error,
  } = useQuery('posts', fetchPostings)

  // const getPostings = async () => {
  //   if (userId) {
  //     const res = await PostService.GetPosts('userId', userId)
  //     if (res.length > 0) {
  //       setPosts(res)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   getPostings()
  // }, [userId])

  return (
    <div>
      <div className='justify-center content-center text-center h-[48px]'>
        <p className='font-semibold text-lg'>Melonn</p>
      </div>
      {!isLoading && <MainPostList posts={posts} />}
    </div>
  )
}

export default HomePage

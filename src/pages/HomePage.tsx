import React, { useEffect, useState } from 'react'
import Header from '../components/organisms/Header'
import BottomBar from '../components/organisms/BottomBar'
import { useUserStore } from '../store/useUserStore'
import { PostService } from '../services/post-service'
import MainPostList from '../components/templates/MainPostList'
import { PostDisplayType, PostType } from '../services/post-service/types'

const HomePage = () => {
  const { userId } = useUserStore()
  const [posts, setPosts] = useState<PostDisplayType[]>([])

  const getPostings = async () => {
    if (userId) {
      const res = await PostService.GetPosts('userId', userId)
      console.log('불러온거 보기 : ', res)
      if (res.length > 0) {
        setPosts(res)
      }
    }
  }

  useEffect(() => {
    getPostings()
  }, [userId])

  return (
    <div>
      <div className='justify-center content-center text-center h-[48px]'>
        <p className='font-semibold text-lg'>Melonn</p>
      </div>
      <MainPostList posts={posts} />
    </div>
  )
}

export default HomePage

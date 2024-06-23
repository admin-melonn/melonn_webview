import { PostDisplayType, PostType } from '@/src/services/post-service/types'
import React from 'react'
import PostDisplay from '../organisms/PostDisplay'

type MainPostListProps = {
  posts: PostDisplayType[] | null
}

const MainPostList = ({ posts }: MainPostListProps) => {
  return (
    <div>
      {posts?.map((post) => {
        return <PostDisplay key={post.postId} post={post} />
      })}
    </div>
  )
}

export default MainPostList

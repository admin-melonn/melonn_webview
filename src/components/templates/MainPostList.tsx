import { PostDisplayType, PostType } from '@/src/services/post-service/types'
import React from 'react'
import PostDisplay from '../organisms/PostDisplay'

type MainPostListProps = {
  posts: PostDisplayType[] | undefined
}

const MainPostList = ({ posts }: MainPostListProps) => {
  console.log('다시 그린다 체크', posts)

  return (
    <div>
      {posts?.map((post) => {
        return <PostDisplay key={post.postId} post={post} />
      })}
    </div>
  )
}

export default MainPostList

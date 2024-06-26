import React from 'react'
import { PostDisplayType, PostType } from '@/src/services/post-service/types'
import PostDisplay from '../organisms/PostDisplay'

type MainPostListProps = {
  posts: PostDisplayType[] | undefined
}

const MainPostList = ({ posts }: MainPostListProps) => {
  console.log('보스트 ', posts)
  return (
    <div>
      {posts &&
        posts.map((post) => {
          return <PostDisplay key={post.postId} post={post} />
        })}
    </div>
  )
}

export default React.memo(MainPostList)

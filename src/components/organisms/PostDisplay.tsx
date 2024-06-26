import React, { useMemo } from 'react'
import { timeAgo } from '../../utils/formatDate'
import { PostDisplayType, PostType } from '@/src/services/post-service/types'
import ContentDisplay from '../morecules/ContentDisplay'
import CommentDisplay from './CommentDisplay'
import { useNavigate } from 'react-router-dom'

type PostDisplayProps = {
  post: PostDisplayType
}

const PostDisplay = ({ post }: PostDisplayProps) => {
  const navigate = useNavigate()

  return (
    <div>
      <div
        onClick={() => {
          navigate(`/post/${post.postId}`)
        }}
        className={`border-t-[0.5px] border-t-slate-300 pt-3`}
      >
        <ContentDisplay
          types='comment'
          content={post}
          isLine={post.comments && post.comments.length > 0}
        />
      </div>
      <div>
        {post.comments &&
          post.comments?.map((comment, index) => {
            return (
              <CommentDisplay
                key={comment.commentId}
                comment={comment}
                isLine={index + 1 != post.comments?.length}
              />
            )
          })}
      </div>
    </div>
  )
}

export default PostDisplay

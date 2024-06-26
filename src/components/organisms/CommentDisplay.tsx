import { CommentDisplayType } from '@/src/services/comment-service/types'
import ContentDisplay from '../morecules/ContentDisplay'
import React from 'react'

type CommentDisplayProps = {
  comment: CommentDisplayType
  isLine: boolean
}

const CommentDisplay = ({ comment, isLine }: CommentDisplayProps) => {
  return (
    <div>
      <ContentDisplay content={comment} isLine={isLine} types='comment' />
      {comment.comments?.map((reply) => {
        return (
          <div key={reply.commentId}>
            <CommentDisplay
              comment={reply}
              isLine={
                reply.comments && reply.comments.length > 0 ? true : false
              }
            />
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(CommentDisplay)

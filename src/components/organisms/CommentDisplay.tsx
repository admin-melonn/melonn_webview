import { CommentDisplayType } from '@/src/services/comment-service/types'
import ContentDisplay from '../morecules/ContentDisplay'

type CommentDisplayProps = {
  comment: CommentDisplayType
  isLine: boolean
}

const CommentDisplay = ({ comment, isLine }: CommentDisplayProps) => {
  return (
    <div>
      <ContentDisplay content={comment} isLine={isLine} />
    </div>
  )
}

export default CommentDisplay

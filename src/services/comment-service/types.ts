import { UserInformationType } from '../user-service/types'

export type CommentType = {
  commentId: string
  createdAt: string
  content: string
  likesCount?: number
  userId: string
  createdBy: 'user' | 'ai'
  parentCommentId?: string
  postId: string
}

export type CommentDisplayType = CommentType & {
  comments?: CommentDisplayType[]
  user?: UserInformationType
}

export type CommentQueryType = Partial<CommentType>

export type CommentColumns = keyof CommentType

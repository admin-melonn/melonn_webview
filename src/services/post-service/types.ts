import { CommentDisplayType, CommentType } from '../comment-service/types'
import { UserInformationType } from '../user-service/types'

export type PostType = {
  postId: string
  createdAt: string
  content: string
  imageUrl?: string
  likesCount?: number
  userId: string
}

export type PostDisplayType = PostType & {
  comments?: CommentDisplayType[]
  user: UserInformationType
}

export type PostQueryType = Partial<PostType>

export type PostColumns = keyof PostType

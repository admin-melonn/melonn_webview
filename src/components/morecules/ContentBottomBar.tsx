import { CommentDisplayType } from '@/src/services/comment-service/types'
import { PostDisplayType } from '@/src/services/post-service/types'
import React from 'react'
import { Heart, MessageCircle } from 'lucide-react'

export type ContentProps = {
  content: Partial<PostDisplayType> & Partial<CommentDisplayType>
}

const ContentBottomBar = ({ content }: ContentProps) => {
  return (
    <div className='flex flex-row'>
      <div className='flex flex-row items-center justify-center mr-4'>
        <Heart className='w-4 h-4' color='#212121' />
        <div className='text-slate-900 ml-[4px]'>{content.likesCount}</div>
      </div>
      <div className='flex flex-row items-center justify-center mr-4'>
        <MessageCircle className='w-4 h-4' color='#212121' />
        <div className='text-slate-900 ml-[4px]'>
          {content.comments ? content.comments.length : 0}
        </div>
      </div>
    </div>
  )
}

export default ContentBottomBar

import { CommentDisplayType } from '@/src/services/comment-service/types'
import { PostDisplayType } from '@/src/services/post-service/types'
import React from 'react'

export type ContentProps = {
  content: PostDisplayType | CommentDisplayType
}

const ContentBottomBar = ({ content }: ContentProps) => {
  return (
    <div className='flex flex-row'>
      <div className='flex flex-row items-center justify-center mr-4'>
        <img src='/img/like.png' className='w-4 h-4' />
        <div className='text-slate-900 ml-[5px]'>{content.likesCount}</div>
      </div>
      <div className='flex flex-row items-center justify-center mr-4'>
        <img src='/svg/comment.svg' className='w-4 h-4' />
        <div className='text-slate-900 ml-[5px]'>
          {content.comments ? content.comments.length : 0}
        </div>
      </div>
    </div>
  )
}

export default ContentBottomBar

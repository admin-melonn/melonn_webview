import { PostDisplayType } from '@/src/services/post-service/types'
import { timeAgo } from '../../utils/formatDate'
import React, { useMemo, useState } from 'react'
import {
  CommentDisplayType,
  CommentType,
} from '@/src/services/comment-service/types'
import ContentBottomBar from './ContentBottomBar'
import ContentNameBar from './ContentNameBar'

type ContentProps = {
  content: PostDisplayType | CommentDisplayType
  isLine: boolean | undefined
  isMain?: boolean
}

const ContentDisplay = ({ content, isLine, isMain = false }: ContentProps) => {
  if (!isMain) {
    return (
      <div className='flex flex-row px-3 pt-1'>
        <div className='flex flex-col justify-start items-center w-[12%] pt-1 max-w-[30px]'>
          <img
            src={
              content.user?.profileImageUrl
                ? content.user?.profileImageUrl
                : '/svg/profile.svg'
            }
            className='w-full h-auto aspect-square rounded-full object-center'
          />
          {isLine && (
            <div className='border border-slate-200 h-full mt-1'></div>
          )}
        </div>
        <div className='w-[90%] pl-2 pb-3'>
          <ContentNameBar content={content} />
          <div className='pb-3 pt-1'>{content.content}</div>
          <ContentBottomBar content={content} />
        </div>
      </div>
    )
  } else {
    return (
      <div className='px-4 pt-1'>
        <div className='flex flex-row items-center content-center'>
          <div className='flex flex-col justify-start items-center w-[12%] pt-1 max-w-[30px]'>
            <img
              src={
                content.user?.profileImageUrl
                  ? content.user?.profileImageUrl
                  : '/svg/profile.svg'
              }
              className='w-full h-auto aspect-square rounded-full object-center'
            />
            {isLine && (
              <div className='border border-slate-200 h-full mt-1'></div>
            )}
          </div>
          <div className='w-[90%] pl-2'>
            <ContentNameBar content={content} />
          </div>
        </div>
        <div className='pb-4 pt-4'>{content.content}</div>
        <ContentBottomBar content={content} />
      </div>
    )
  }
}

export default React.memo(ContentDisplay)

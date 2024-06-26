import { PostDisplayType } from '@/src/services/post-service/types'
import React from 'react'
import { CommentDisplayType } from '@/src/services/comment-service/types'
import ContentBottomBar from './ContentBottomBar'
import ContentNameBar from './ContentNameBar'

type ContentProps = {
  content: Partial<PostDisplayType> & Partial<CommentDisplayType>
  isLine: boolean | undefined
  isMain?: boolean
  types: 'post' | 'comment'
}

const ContentDisplay = ({
  types,
  content,
  isLine,
  isMain = false,
}: ContentProps) => {
  if (!isMain) {
    return (
      <div className='flex flex-row px-3 pt-1 text-[15px]'>
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
          <ContentNameBar
            name={content.user?.name}
            id={types == 'post' ? content.postId : content.commentId}
            createdAt={content.createdAt}
          />
          <div className='pb-2 pt-0'>{content.content}</div>
          <ContentBottomBar content={content} />
        </div>
      </div>
    )
  } else {
    return (
      <div className='px-4 pt-0 text-[15px]'>
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
            <ContentNameBar
              name={content.user?.name}
              id={types == 'post' ? content.postId : content.commentId}
              createdAt={content.createdAt}
            />
          </div>
        </div>
        <div className='pb-2 pt-2'>{content.content}</div>
        <ContentBottomBar content={content} />
      </div>
    )
  }
}

export default React.memo(ContentDisplay)

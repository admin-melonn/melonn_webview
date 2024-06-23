import React, { useMemo, useState } from 'react'
import { ContentProps } from './ContentBottomBar'
import { timeAgo } from '../../utils/formatDate'

const ContentNameBar = ({ content }: ContentProps) => {
  const ago = useMemo(() => {
    return timeAgo(content.createdAt)
  }, [content.createdAt])

  return (
    <div className='flex flex-row justify-between items-center'>
      <div className='flex flex-row'>
        <div className='font-semibold'>{content.user?.name}</div>
        <div className='text-slate-400 ml-2'>{ago}</div>
      </div>
      <div>
        <img src='/svg/more.svg' className='w-[22px] rounded-full' />
      </div>
    </div>
  )
}

export default ContentNameBar

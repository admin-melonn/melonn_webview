import { useReplyStore } from '../..//store/useReplyStore'
import { timeAgo } from '../../utils/formatDate'
import React from 'react'

const ParentContent = () => {
  const { parent } = useReplyStore()

  if (parent)
    return (
      <div>
        <div className='flex flex-row px-2 pt-1 mt-3'>
          <div className='flex justify-end items-start p-0 pl-2'>
            <img
              src={parent.profileUrl ? parent.profileUrl : '/svg/profile.svg'}
              className='w-[34px] h-[34px] rounded-full'
            />
          </div>
          <div className='w-full ml-2 pb-3'>
            <div className='flex flex-row justify-between content-center'>
              <div className='flex flex-row'>
                <div className='font-semibold'>{parent.name}</div>
                <div className='text-slate-400 ml-2'>
                  {timeAgo(new Date(parent.createdAt))}
                </div>
              </div>
              <div></div>
            </div>
            <div className='pb-4 pt-1'>{parent.content}</div>
          </div>
        </div>
      </div>
    )
  else {
    return <></>
  }
}

export default React.memo(ParentContent)

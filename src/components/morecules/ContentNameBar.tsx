import React, { useMemo, useState } from 'react'
import { ContentProps } from './ContentBottomBar'
import { timeAgo } from '../../utils/formatDate'
import CustomBottomSheet from '../organisms/BottomSheet'

type ContentNameBarProps = {
  name?: string
  createdAt?: string
  id?: string
}

const ContentNameBar = ({ name, createdAt, id }: ContentNameBarProps) => {
  const [open, setOpen] = useState(false)

  const ago = useMemo(() => {
    if (createdAt) return timeAgo(createdAt)
  }, [createdAt])

  return (
    <div className='flex flex-row justify-between items-center'>
      <div className='flex flex-row'>
        <div className='font-semibold'>{name}</div>
        <div className='text-slate-400 ml-2'>{ago}</div>
      </div>
      <div>
        <img
          onClick={() => setOpen(true)}
          src='/svg/more.svg'
          className='w-[22px] rounded-full'
        />
      </div>
      {id && <CustomBottomSheet open={open} setOpen={setOpen} contentId={id} />}
    </div>
  )
}

export default ContentNameBar

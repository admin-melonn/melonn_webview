import React from 'react'
import Icon from '../atom/Icon'
import { useNavigate } from 'react-router-dom'
import { Heart, House, Plus, Search } from 'lucide-react'

const BottomBar = () => {
  const navigate = useNavigate()

  return (
    <div className='fixed grid grid-flow-row grid-cols-5 gap-1 px-3 py-1 pb-6 bg-gray-50 border-t border-gray-200 left-0 bottom-0 w-[100%]'>
      <div className='flex items-center justify-center pt-[3px]'>
        <House color='#919191' />
      </div>
      <div className='flex items-center justify-center'>
        <Search color='#919191' />
      </div>
      <div
        className='flex justify-center items-center'
        onClick={() => {
          navigate('/write')
        }}
      >
        <div className='rounded-[8px] py-[5px] px-3 bg-[#efefef] '>
          <Plus className='w-6' color='#919191' />
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <Heart color='#919191' />
      </div>
      <div
        className='flex justify-center items-center'
        onClick={() => {
          navigate('/profile')
        }}
      >
        <Icon src='/img/profile.png' size='sm' />
      </div>
    </div>
  )
}

export default React.memo(BottomBar)

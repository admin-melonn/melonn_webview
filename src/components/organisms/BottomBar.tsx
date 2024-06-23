import React from 'react'
import Icon from '../atom/Icon'
import { useNavigate } from 'react-router-dom'

const BottomBar = () => {
  const navigate = useNavigate()

  return (
    <div className='fixed grid grid-flow-row grid-cols-5 gap-1 p-3 pb-4 bg-gray-50 border-t border-gray-200 left-0 bottom-0 w-[100%]'>
      <Icon src='img/home.png' size='sm' />
      <Icon src='img/search.png' size='sm' />
      <div
        className='flex justify-center items-center'
        onClick={() => {
          navigate('/write')
        }}
      >
        <Icon src='img/add.png' size='sm' />
      </div>
      <Icon src='img/like.png' size='sm' />
      <Icon src='img/home.png' size='sm' />
    </div>
  )
}

export default BottomBar

import React, { Children, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex justify-center content-center w-full h-[100vh] bg-gray-200'>
      <div className='bg-white w-full max-w-[600px] relative'>{children}</div>
    </div>
  )
}

export default MobileLayout

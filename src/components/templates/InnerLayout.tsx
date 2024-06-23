import React from 'react'
import { Outlet } from 'react-router-dom'
import MobileLayout from './MobileLayout'

const InnerLayout = () => {
  return (
    <MobileLayout>
      <Outlet />
    </MobileLayout>
  )
}

export default InnerLayout

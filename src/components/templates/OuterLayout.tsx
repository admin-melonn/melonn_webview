import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import MobileLayout from './MobileLayout'
import BottomBar from '../organisms/BottomBar'

const OuterLayout = () => {
  return (
    <MobileLayout>
      <Outlet />
      <br />
      <br />
      <br />
      <BottomBar />
    </MobileLayout>
  )
}

export default OuterLayout

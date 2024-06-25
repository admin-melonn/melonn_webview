import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MobileLayout from './MobileLayout'
import BottomBar from '../organisms/BottomBar'
import { useSession } from '../../hooks/auth'

const OuterLayout = () => {
  const { session, isLoading } = useSession()
  const navigate = useNavigate()

  if (!session) {
    navigate('/signin')
  }

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

export default React.memo(OuterLayout)

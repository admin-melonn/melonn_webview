import { sb } from '../../services/supabase'
import { useSession } from '../../hooks/auth'
import React, { useCallback, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingScreen from './LoadingScreen'
import { useUserStore } from '../../store/useUserStore'
import { UserService } from '../../services/user-service'
import { UserInformationType } from '../../services/user-service/types'

const SessionLayout = () => {
  const { isLoading, setSession } = useSession()
  const { setEmail, setImgUrl, setName, setUserId } = useUserStore()

  const initSession = useCallback(async () => {
    console.log('이건 몇번 호출 되는거야?')

    const {
      data: { session },
    } = await sb.auth.getSession()
    setSession(session)

    if (session) {
      setEmail(session.user.user_metadata.email)
      setImgUrl(session.user.user_metadata.avatar_url)
      setName(session.user.user_metadata.name)
      setUserId(session.user.id)

      const res = await UserService.GetUser('userId', session.user.id)
      // 유저 정보가 없으면 회원가입
      if (!res || res.length == 0) {
        const body: UserInformationType = {
          userId: session.user.id,
          email: session.user.user_metadata.email,
          name: session.user.user_metadata.name,
          displayName: session.user.user_metadata.name,
          profileImageUrl: session.user.user_metadata.avatar_url,
          registeredAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        }
        const registerResponse = await UserService.InsertUser(body)
      }
    }
  }, [])

  useEffect(() => {
    initSession()

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return <Outlet />
}

export default SessionLayout

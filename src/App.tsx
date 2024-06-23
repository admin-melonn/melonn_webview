import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import React, { useEffect } from 'react'
import { sb, supabase } from './services/supabase'
import { useUserStore } from './store/useUserStore'
import { UserService } from './services/user-service'
import {
  UserInformationQueryType,
  UserInformationType,
} from '@/src/services/user-service/types'
import { v4 } from 'uuid'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'

function App() {
  const { setEmail, setImgUrl, setName, setUserId } = useUserStore()

  useEffect(() => {
    ;(async () => {
      const userdata = await sb.auth.getUser()

      if (userdata.data.user) {
        setEmail(userdata.data.user.user_metadata.email)
        setImgUrl(userdata.data.user.user_metadata.avatar_url)
        setName(userdata.data.user.user_metadata.name)

        const res = await UserService.GetUser(
          'email',
          userdata.data.user.user_metadata.email
        )
        // 유저 정보가 없으면 회원가입
        if (!res || res.length == 0) {
          const body: UserInformationType = {
            userId: v4(),
            email: userdata.data.user.user_metadata.email,
            name: userdata.data.user.user_metadata.name,
            displayName: userdata.data.user.user_metadata.name,
            profileImageUrl: userdata.data.user.user_metadata.avatar_url,
            registeredAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
          }
          setUserId(body.userId)
          const registerResponse = await UserService.InsertUser(body)
          console.log('첫 가입 결과 : ', registerResponse)
        } else {
          if (res[0].userId) setUserId(res[0].userId)
        }
      }
    })()
  }, [])

  return (
    <>
      <React.StrictMode>
        <Theme>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Theme>
      </React.StrictMode>
    </>
  )
}

export default React.memo(App)

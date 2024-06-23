import React from 'react'
import { supabase, sb } from '../services/supabase'
import { UserService } from '../services/user-service'
import { UserInformationQueryType } from '../services/user-service/types'
import { v4 } from 'uuid'

const SignInPage = () => {
  const login = async () => {
    const { data, error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: '/',
      },
    })
  }

  return (
    <div>
      로그인
      <button onClick={() => login()}>Google login</button>
    </div>
  )
}

export default SignInPage

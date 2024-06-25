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

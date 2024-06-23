import { sb } from '../services/supabase'
import { Session } from '@supabase/supabase-js'
import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const sessionAtom = atom<Session | null>(null)
const sessionLoadingAtom = atom<boolean>(true)

export const useSession = () => {
  const [value, set] = useAtom(sessionAtom)
  const [isLoading, setIsLoading] = useAtom(sessionLoadingAtom)
  const navigate = useNavigate()

  const signOut = useCallback(async () => {
    setIsLoading(true)
    await sb.auth.signOut()
    set(null)
    setIsLoading(false)
    navigate('/signin')
  }, [])

  return {
    session: value,
    setSession: (session: Session | null) => {
      set(session)
      setIsLoading(false)
    },
    isLoading,
    signOut,
  }
}

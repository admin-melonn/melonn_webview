import React from 'react'
import { useSession } from '../hooks/auth'
import { Button } from '../components/atom/ui/button'

const ProfilePage = () => {
  const { signOut } = useSession()
  return (
    <div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  )
}

export default ProfilePage

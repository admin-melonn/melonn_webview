import React from 'react'

const LoadingScreen = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <img src='/svg/loading.svg' className='w-12 h-12' />
    </div>
  )
}

export default React.memo(LoadingScreen)

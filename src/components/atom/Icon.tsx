import React from 'react'
import classNames from 'classnames'

type SizeType = 'sm' | 'md' | 'lg'

const Icon = ({
  src,
  size = 'md',
  className,
}: {
  src: string
  size?: SizeType
  className?: string
}) => {
  const sizeClass = classNames({
    'w-5 h-5': size === 'sm', // 20px
    'w-6 h-6': size === 'md', // 24px
    'w-8 h-8': size === 'lg', // 32px
  })

  const combinedClass = classNames(sizeClass, className)

  return (
    <div className='flex justify-center items-center cursor-pointer'>
      <img className={combinedClass} src={src} alt={src} />
    </div>
  )
}

export default Icon

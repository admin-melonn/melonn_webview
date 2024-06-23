export const formatDate = (date: Date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${month} ${day}, ${year}. ${hours}:${minutes}`
}

export const timeAgo = (date: Date | number | string) => {
  const currentDate = new Date()
  const givenDate = new Date(date)

  const diffInSeconds = Math.floor(
    ((currentDate as any) - (givenDate as any)) / 1000
  )
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 60) {
    if (diffInMinutes === 0) {
      return `now`
    }
    if (diffInMinutes === 1) {
      return `${diffInMinutes}m`
    } else {
      return `${diffInMinutes}m`
    }
  } else if (diffInMinutes >= 60 && diffInMinutes < 1440) {
    if (diffInHours === 1) {
      return `${diffInHours}h`
    } else {
      return `${diffInHours}h`
    }
  } else if (diffInHours >= 24 && diffInHours <= 24 * 30) {
    if (diffInDays === 1) {
      return `${diffInDays}d`
    } else {
      return `${diffInDays}d`
    }
  } else {
    const year = givenDate.getFullYear()
    const month = givenDate.getMonth()
    const day = givenDate.getDate().toString().padStart(2, '0')

    return `${day}/${month}/${year}`
  }
}

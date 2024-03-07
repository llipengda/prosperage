const useTime =
  (formatToDate = false) =>
  (time: string) => {
    const date = new Date(time.replace(/-/g, '/'))
    if (formatToDate) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)
    if (seconds < 60) {
      return '刚刚'
    }
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) {
      return `${minutes}分钟前`
    }
    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
      return `${hours}小时前`
    }
    const days = Math.floor(hours / 24)
    if (days < 30) {
      return `${days}天前`
    }
    const months = Math.floor(days / 30)
    if (months < 12) {
      return `${months}月前`
    }
    const years = Math.floor(months / 12)
    return `${years}年前`
  }

export default useTime

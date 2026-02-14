export const toIsoDate = (date: Date) => date.toISOString()

export const isToday = (value: string) => {
  const date = new Date(value)
  const now = new Date()
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  )
}

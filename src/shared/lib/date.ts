/** An ISO 8601 datetime string as returned by `Date.prototype.toISOString()`. */
export type IsoDateString = string & { readonly __brand: 'IsoDateString' }

export const toIsoDateTime = (date: Date): IsoDateString =>
  date.toISOString() as IsoDateString

export const toDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const normalizeDateKey = (value: string) => {
  if (!value) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return toDateKey(date)
}

export const isToday = (value: string) => {
  const dateKey = normalizeDateKey(value)
  if (!dateKey) return false
  return dateKey === toDateKey(new Date())
}

export const formatDate = (value: string) => {
  const dateKey = normalizeDateKey(value)
  if (!dateKey) return ''
  const [year, month, day] = dateKey.split('-')
  return `${day}/${month}/${year}`
}

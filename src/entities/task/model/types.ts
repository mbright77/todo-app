export type Task = {
  id: string
  title: string
  description: string | null
  completed: boolean
  dueDate: string | null
  order: number
  createdAt: string
  updatedAt: string
}

export type TaskFilterKey = 'all' | 'active' | 'today' | 'completed' | 'upcoming'

export type TaskFilter = {
  key: TaskFilterKey
  label: string
}

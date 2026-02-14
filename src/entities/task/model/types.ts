export type Task = {
  id: string
  title: string
  description: string | null
  completed: boolean
  dueDate: string | null
  createdAt: string
  updatedAt: string
}

export type TaskFilterKey = 'all' | 'active' | 'completed'

export type TaskFilter = {
  key: TaskFilterKey
  label: string
}

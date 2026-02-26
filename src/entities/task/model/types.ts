import type { TaskRecord } from '../../../shared/lib/db'

export type Task = TaskRecord & { order: number }

export type TaskFilterKey = 'all' | 'active' | 'today' | 'completed' | 'upcoming'

export type TaskFilter = {
  key: TaskFilterKey
  label: string
}

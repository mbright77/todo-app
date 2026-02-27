import type { TaskRecord } from '../../../shared/lib/db'

export type Task = TaskRecord & { order: number }

export type TaskFilterKey = 'active' | 'today' | 'completed' | 'upcoming'

export type TaskFilter = {
  key: TaskFilterKey
  label: string
}

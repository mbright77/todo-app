import { create } from 'zustand'
import type { Task, TaskFilter } from './types'
import { taskDb } from '../api/task.db'
import { toIsoDateTime } from '../../../shared/lib/date'
import { TASK_FILTERS } from '../../../shared/config/constants'
import { buildTask } from './task.factory'

const FILTERS: TaskFilter[] = TASK_FILTERS

type TaskState = {
  filter: TaskFilter
  filters: TaskFilter[]
  setFilter: (filter: TaskFilter) => void
  createTask: (input: { title: string; description?: string; dueDate?: string }) => Promise<void>
  updateTask: (id: string, update: Partial<Task>) => Promise<void>
  toggleTask: (id: string, completed: boolean) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  reorderTasks: (updates: { id: string; order: number }[]) => Promise<void>
}

export const useTaskStore = create<TaskState>((set) => ({
  filter: FILTERS[0],
  filters: FILTERS,
  setFilter: (filter) => set({ filter }),
  createTask: async (input) => {
    const task = buildTask(input, 0) // order will be set inside the transaction
    await taskDb.createWithMinOrder(task)
  },
  updateTask: async (id, update) => {
    await taskDb.update(id, { ...update, updatedAt: toIsoDateTime(new Date()) })
  },
  toggleTask: async (id, completed) => {
    await taskDb.update(id, { completed, updatedAt: toIsoDateTime(new Date()) })
  },
  deleteTask: async (id) => {
    await taskDb.remove(id)
  },
  reorderTasks: async (updates) => {
    if (updates.length === 0) return
    await taskDb.bulkUpdateOrder(updates)
  },
}))

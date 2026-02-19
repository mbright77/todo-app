import { create } from 'zustand'
import type { Task, TaskFilter } from './types'
import { taskDb } from '../api/task.db'
import { createId } from '../../../shared/lib/id'
import { toIsoDate } from '../../../shared/lib/date'

const FILTERS: TaskFilter[] = [
  { key: 'active', label: 'Active' },
  { key: 'today', label: 'Today' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'all', label: 'All tasks' },
]

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

const buildTask = (
  input: { title: string; description?: string; dueDate?: string },
  order: number
): Task => {
  const now = toIsoDate(new Date())
  return {
    id: createId(),
    title: input.title.trim(),
    description: input.description?.trim() ?? null,
    completed: false,
    dueDate: input.dueDate ?? null,
    order,
    createdAt: now,
    updatedAt: now,
  }
}

export const useTaskStore = create<TaskState>((set) => ({
  filter: FILTERS[0],
  filters: FILTERS,
  setFilter: (filter) => set({ filter }),
  createTask: async (input) => {
    const minOrder = await taskDb.getMinOrder()
    const order = (minOrder ?? 0) - 1
    const task = buildTask(input, order)
    await taskDb.add(task)
  },
  updateTask: async (id, update) => {
    await taskDb.update(id, { ...update, updatedAt: toIsoDate(new Date()) })
  },
  toggleTask: async (id, completed) => {
    await taskDb.update(id, { completed, updatedAt: toIsoDate(new Date()) })
  },
  deleteTask: async (id) => {
    await taskDb.remove(id)
  },
  reorderTasks: async (updates) => {
    if (updates.length === 0) return
    await taskDb.bulkUpdateOrder(updates)
  },
}))

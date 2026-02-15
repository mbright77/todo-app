import { db } from '../../../shared/lib/db'
import type { Task, TaskFilterKey } from '../model/types'
import { isToday, normalizeDateKey } from '../../../shared/lib/date'

const sortByCreatedAt = (list: Task[]) =>
  list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

export const taskDb = {
  getAll: () => db.tasks.orderBy('createdAt').reverse().toArray(),
  getByFilter: async (filter: TaskFilterKey) => {
    if (filter === 'all') {
      return db.tasks.orderBy('createdAt').reverse().toArray()
    }

    if (filter === 'active') {
      const list = await db.tasks
        .filter((task) => {
          if (task.completed) return false
          if (!task.dueDate) return true
          return isToday(task.dueDate)
        })
        .toArray()
      return sortByCreatedAt(list)
    }

    if (filter === 'today') {
      const list = await db.tasks
        .filter((task) => !task.completed && !!task.dueDate && isToday(task.dueDate))
        .toArray()
      return sortByCreatedAt(list)
    }

    if (filter === 'upcoming') {
      const todayKey = normalizeDateKey(new Date().toISOString())
      const list = await db.tasks
        .filter((task) => {
          if (!task.dueDate) return false
          if (task.completed) return false
          const dueKey = normalizeDateKey(task.dueDate)
          return !!dueKey && dueKey > todayKey
        })
        .toArray()
      return list.sort((a, b) => (a.dueDate ?? '').localeCompare(b.dueDate ?? ''))
    }

    const completed = filter === 'completed'
    const list = await db.tasks.filter((task) => task.completed === completed).toArray()

    return sortByCreatedAt(list)
  },
  searchByTitle: async (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return []

    const list = await db.tasks
      .filter((task) => task.title.toLowerCase().includes(trimmed.toLowerCase()))
      .toArray()

    return sortByCreatedAt(list)
  },
  add: (task: Task) => db.tasks.add(task),
  update: (id: string, update: Partial<Task>) => db.tasks.update(id, update),
  remove: (id: string) => db.tasks.delete(id),
  clear: () => db.tasks.clear(),
}

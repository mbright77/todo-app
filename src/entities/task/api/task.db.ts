import { db } from '../../../shared/lib/db'
import type { Task, TaskFilterKey } from '../model/types'
import { isToday, normalizeDateKey } from '../../../shared/lib/date'

const sortByOrder = (list: Task[]) =>
  list.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return b.createdAt.localeCompare(a.createdAt)
  })

export const taskDb = {
  getAll: async () => {
    const list = await db.tasks.toArray()
    return sortByOrder(list)
  },
  getByFilter: async (filter: TaskFilterKey) => {
    if (filter === 'all') {
      const list = await db.tasks.toArray()
      return sortByOrder(list)
    }

    if (filter === 'active') {
      const list = await db.tasks
        .filter((task) => {
          if (task.completed) return false
          if (!task.dueDate) return true
          return isToday(task.dueDate)
        })
        .toArray()
      return sortByOrder(list)
    }

    if (filter === 'today') {
      const list = await db.tasks
        .filter((task) => !task.completed && !!task.dueDate && isToday(task.dueDate))
        .toArray()
      return sortByOrder(list)
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
      return sortByOrder(list)
    }

    const completed = filter === 'completed'
    const list = await db.tasks.filter((task) => task.completed === completed).toArray()

    return sortByOrder(list)
  },
  searchByTitle: async (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return []

    const list = await db.tasks
      .filter((task) => task.title.toLowerCase().includes(trimmed.toLowerCase()))
      .toArray()

    return sortByOrder(list)
  },
  add: (task: Task) => db.tasks.add(task),
  update: (id: string, update: Partial<Task>) => db.tasks.update(id, update),
  remove: (id: string) => db.tasks.delete(id),
  clear: () => db.tasks.clear(),
  getMinOrder: async () => {
    const list = await db.tasks.orderBy('order').limit(1).toArray()
    return list[0]?.order
  },
  updateOrder: (id: string, order: number) => db.tasks.update(id, { order }),
  bulkUpdateOrder: (updates: { id: string; order: number }[]) =>
    db.transaction('rw', db.tasks, async () => {
      await Promise.all(updates.map((update) => db.tasks.update(update.id, { order: update.order })))
    }),
}

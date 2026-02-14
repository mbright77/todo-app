import { db } from '../../../shared/lib/db'
import type { Task } from '../model/types'

export const taskDb = {
  getAll: () => db.tasks.orderBy('createdAt').reverse().toArray(),
  getByFilter: async (filter: 'all' | 'active' | 'completed') => {
    if (filter === 'all') {
      return db.tasks.orderBy('createdAt').reverse().toArray()
    }

    const completed = filter === 'completed'
    const list = await db.tasks
      .where('completed')
      .equals(completed)
      .toArray()

    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },
  add: (task: Task) => db.tasks.add(task),
  update: (id: string, update: Partial<Task>) => db.tasks.update(id, update),
  remove: (id: string) => db.tasks.delete(id),
  clear: () => db.tasks.clear(),
}

import Dexie, { type Table } from 'dexie'
import type { Task } from '../../entities/task/model/types'

export class TodoDatabase extends Dexie {
  tasks!: Table<Task, string>

  constructor() {
    super('todo-app')
    this.version(1).stores({
      tasks: 'id, title, completed, dueDate, createdAt',
    })
    this.version(2)
      .stores({
        tasks: 'id, order, title, completed, dueDate, createdAt',
      })
      .upgrade(async (tx) => {
        const tasks = await tx.table('tasks').orderBy('createdAt').reverse().toArray()
        await Promise.all(
          tasks.map((task, index) =>
            tx.table('tasks').update(task.id, { order: task.order ?? index })
          )
        )
      })
  }
}

export const db = new TodoDatabase()

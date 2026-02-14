import Dexie, { type Table } from 'dexie'
import type { Task } from '../../entities/task/model/types'

export class TodoDatabase extends Dexie {
  tasks!: Table<Task, string>

  constructor() {
    super('todo-app')
    this.version(1).stores({
      tasks: 'id, title, completed, dueDate, createdAt',
    })
  }
}

export const db = new TodoDatabase()

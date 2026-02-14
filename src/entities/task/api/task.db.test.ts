import { describe, expect, it, beforeEach } from 'vitest'
import { taskDb } from './task.db'
import { db } from '../../../shared/lib/db'
import type { Task } from '../model/types'

const buildTask = (overrides: Partial<Task> = {}): Task => ({
  id: overrides.id ?? 'task-' + Math.random().toString(36).slice(2, 10),
  title: overrides.title ?? 'Task',
  description: overrides.description ?? null,
  completed: overrides.completed ?? false,
  dueDate: overrides.dueDate ?? null,
  createdAt: overrides.createdAt ?? new Date().toISOString(),
  updatedAt: overrides.updatedAt ?? new Date().toISOString(),
})

describe('taskDb', () => {
  beforeEach(async () => {
    await db.tasks.clear()
  })


  it('adds and returns tasks', async () => {
    const task = buildTask({ title: 'Alpha' })
    await taskDb.add(task)

    const tasks = await taskDb.getAll()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe('Alpha')
  })

  it('filters by completion', async () => {
    await taskDb.add(buildTask({ title: 'Open', completed: false }))
    await taskDb.add(buildTask({ title: 'Done', completed: true }))

    const active = await taskDb.getByFilter('active')
    const completed = await taskDb.getByFilter('completed')

    expect(active).toHaveLength(1)
    expect(active[0].title).toBe('Open')
    expect(completed).toHaveLength(1)
    expect(completed[0].title).toBe('Done')
  })

  it('filters by today and upcoming', async () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    await taskDb.add(
      buildTask({
        title: 'Today task',
        dueDate: today.toISOString().slice(0, 10),
      })
    )
    await taskDb.add(
      buildTask({
        title: 'Upcoming task',
        dueDate: tomorrow.toISOString().slice(0, 10),
      })
    )
    await taskDb.add(buildTask({ title: 'No due date' }))

    const todayTasks = await taskDb.getByFilter('today')
    const upcomingTasks = await taskDb.getByFilter('upcoming')

    expect(todayTasks).toHaveLength(1)
    expect(todayTasks[0].title).toBe('Today task')
    expect(upcomingTasks).toHaveLength(1)
    expect(upcomingTasks[0].title).toBe('Upcoming task')
  })

  it('searches by title', async () => {
    await taskDb.add(buildTask({ title: 'Write docs' }))
    await taskDb.add(buildTask({ title: 'Review PR' }))

    const results = await taskDb.searchByTitle('doc')
    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Write docs')
  })
})

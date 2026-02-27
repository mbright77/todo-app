import { describe, expect, it, beforeEach } from 'vitest'
import { taskDb } from './task.db'
import { db } from '../../../shared/lib/db'
import type { Task } from '../model/types'
import { toDateKey } from '../../../shared/lib/date'

const buildTask = (overrides: Partial<Task> = {}): Task => ({
  id: overrides.id ?? 'task-' + Math.random().toString(36).slice(2, 10),
  title: overrides.title ?? 'Task',
  description: overrides.description ?? null,
  completed: overrides.completed ?? false,
  dueDate: overrides.dueDate ?? null,
  order: overrides.order ?? 0,
  createdAt: overrides.createdAt ?? new Date().toISOString(),
  updatedAt: overrides.updatedAt ?? new Date().toISOString(),
})

describe('taskDb', () => {
  beforeEach(async () => {
    await db.tasks.clear()
  })


  it('adds and returns tasks', async () => {
    const task = buildTask({ title: 'Alpha', order: 0 })
    await taskDb.add(task)

    const tasks = await taskDb.getAll()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe('Alpha')
  })

  it('filters by completion', async () => {
    await taskDb.add(buildTask({ title: 'Open', completed: false, order: 0 }))
    await taskDb.add(buildTask({ title: 'Done', completed: true, order: 1 }))

    const active = await taskDb.getByFilter('active')
    const completed = await taskDb.getByFilter('completed')

    expect(active).toHaveLength(1)
    expect(active[0].title).toBe('Open')
    expect(completed).toHaveLength(1)
    expect(completed[0].title).toBe('Done')
  })

  it('sorts results by order', async () => {
    await taskDb.add(buildTask({ title: 'Third', order: 2 }))
    await taskDb.add(buildTask({ title: 'First', order: 0 }))
    await taskDb.add(buildTask({ title: 'Second', order: 1 }))

    const tasks = await taskDb.getAll()
    expect(tasks.map((task) => task.title)).toEqual(['First', 'Second', 'Third'])
  })

  it('filters by active, today, and upcoming', async () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    await taskDb.add(
      buildTask({
        title: 'Due today',
        dueDate: toDateKey(today),
        order: 1,
      })
    )
    await taskDb.add(
      buildTask({
        title: 'Upcoming task',
        dueDate: toDateKey(tomorrow),
        order: 2,
      })
    )
    await taskDb.add(buildTask({ title: 'No due date', order: 0 }))

    const activeTasks = await taskDb.getByFilter('active')
    const todayTasks = await taskDb.getByFilter('today')
    const upcomingTasks = await taskDb.getByFilter('upcoming')

    expect(activeTasks).toHaveLength(2)
    expect(activeTasks.map((task) => task.title)).toEqual(['No due date', 'Due today'])
    expect(todayTasks).toHaveLength(1)
    expect(todayTasks[0].title).toBe('Due today')
    expect(upcomingTasks).toHaveLength(1)
    expect(upcomingTasks[0].title).toBe('Upcoming task')
  })

  it('includes overdue incomplete tasks in active filter', async () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    await taskDb.add(buildTask({ title: 'Overdue task', dueDate: toDateKey(yesterday), order: 0 }))
    await taskDb.add(buildTask({ title: 'No due date', order: 1 }))
    await taskDb.add(buildTask({ title: 'Done overdue', completed: true, dueDate: toDateKey(yesterday), order: 2 }))

    const activeTasks = await taskDb.getByFilter('active')

    expect(activeTasks.map((t) => t.title)).toContain('Overdue task')
    expect(activeTasks.map((t) => t.title)).toContain('No due date')
    expect(activeTasks.map((t) => t.title)).not.toContain('Done overdue')
  })

  it('excludes completed tasks from active and today', async () => {
    const today = new Date()
    const todayKey = toDateKey(today)

    await taskDb.add(buildTask({ title: 'Done today', completed: true, dueDate: todayKey, order: 3 }))
    await taskDb.add(buildTask({ title: 'Done no date', completed: true, order: 2 }))
    await taskDb.add(buildTask({ title: 'Active today', dueDate: todayKey, order: 1 }))
    await taskDb.add(buildTask({ title: 'Active no date', order: 0 }))

    const activeTasks = await taskDb.getByFilter('active')
    const todayTasks = await taskDb.getByFilter('today')

    expect(activeTasks).toHaveLength(2)
    expect(activeTasks.map((task) => task.title)).toEqual(
      expect.arrayContaining(['Active today', 'Active no date'])
    )
    expect(todayTasks).toHaveLength(1)
    expect(todayTasks[0].title).toBe('Active today')
  })

  it('treats ISO due dates as today', async () => {
    const todayIso = new Date().toISOString()
    await taskDb.add(buildTask({ title: 'ISO today', dueDate: todayIso, order: 0 }))

    const todayTasks = await taskDb.getByFilter('today')

    expect(todayTasks).toHaveLength(1)
    expect(todayTasks[0].title).toBe('ISO today')
  })

  it('searches by title', async () => {
    await taskDb.add(buildTask({ title: 'Write docs', order: 1 }))
    await taskDb.add(buildTask({ title: 'Review PR', order: 0 }))

    const results = await taskDb.searchByTitle('doc')
    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Write docs')
  })

  it('searchByTitle is case-insensitive', async () => {
    await taskDb.add(buildTask({ title: 'Write Docs', order: 0 }))

    const lower = await taskDb.searchByTitle('write docs')
    const upper = await taskDb.searchByTitle('WRITE DOCS')
    const mixed = await taskDb.searchByTitle('wRiTe DoCs')

    expect(lower).toHaveLength(1)
    expect(upper).toHaveLength(1)
    expect(mixed).toHaveLength(1)
  })

  it('searchByTitle returns empty array for blank query', async () => {
    await taskDb.add(buildTask({ title: 'Something', order: 0 }))
    const results = await taskDb.searchByTitle('   ')
    expect(results).toHaveLength(0)
  })

  it('removes a task', async () => {
    const task = buildTask({ title: 'Removable', order: 0 })
    await taskDb.add(task)
    await taskDb.remove(task.id)

    const tasks = await taskDb.getAll()
    expect(tasks).toHaveLength(0)
  })

  it('updates a task field', async () => {
    const task = buildTask({ title: 'Original', order: 0 })
    await taskDb.add(task)
    await taskDb.update(task.id, { title: 'Updated' })

    const tasks = await taskDb.getAll()
    expect(tasks[0].title).toBe('Updated')
  })

  it('bulkUpdateOrder updates multiple tasks at once', async () => {
    const a = buildTask({ id: 'ord-a', order: 0 })
    const b = buildTask({ id: 'ord-b', order: 1 })
    await taskDb.add(a)
    await taskDb.add(b)

    await taskDb.bulkUpdateOrder([
      { id: 'ord-a', order: 10 },
      { id: 'ord-b', order: 5 },
    ])

    const tasks = await taskDb.getAll()
    // sorted by order: b(5) then a(10)
    expect(tasks.map((t) => t.id)).toEqual(['ord-b', 'ord-a'])
  })

  it('getMinOrder returns undefined on an empty table', async () => {
    const minOrder = await taskDb.getMinOrder()
    expect(minOrder).toBeUndefined()
  })

  it('getMinOrder returns the lowest order value', async () => {
    await taskDb.add(buildTask({ order: 5 }))
    await taskDb.add(buildTask({ order: -3 }))
    await taskDb.add(buildTask({ order: 0 }))

    const minOrder = await taskDb.getMinOrder()
    expect(minOrder).toBe(-3)
  })
})

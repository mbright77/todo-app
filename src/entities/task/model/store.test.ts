import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { useTaskStore } from './store'
import { taskDb } from '../api/task.db'

describe('useTaskStore', () => {
  beforeEach(async () => {
    await taskDb.clear()
  })

  afterEach(async () => {
    await taskDb.clear()
  })

  it('creates tasks through the store', async () => {
    const store = useTaskStore.getState()
    await store.createTask({ title: 'Make tea', description: 'Green tea' })

    const tasks = await taskDb.getAll()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe('Make tea')
    expect(tasks[0].order).toBeLessThan(0)
  })

  it('creates new tasks above existing ones', async () => {
    const store = useTaskStore.getState()
    await store.createTask({ title: 'First' })
    await store.createTask({ title: 'Second' })

    const tasks = await taskDb.getAll()
    expect(tasks.map((task) => task.title)).toEqual(['Second', 'First'])
    expect(tasks[0].order).toBeLessThan(tasks[1].order)
  })

  it('updates and toggles tasks', async () => {
    const store = useTaskStore.getState()
    await store.createTask({ title: 'Draft notes' })

    const [task] = await taskDb.getAll()
    await store.updateTask(task.id, { title: 'Draft outline' })
    await store.toggleTask(task.id, true)

    const [updated] = await taskDb.getAll()
    expect(updated.title).toBe('Draft outline')
    expect(updated.completed).toBe(true)
  })

  it('reorders tasks', async () => {
    await taskDb.add({
      id: 'a',
      title: 'Alpha',
      description: null,
      completed: false,
      dueDate: null,
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    await taskDb.add({
      id: 'b',
      title: 'Beta',
      description: null,
      completed: false,
      dueDate: null,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    const store = useTaskStore.getState()
    await store.reorderTasks([
      { id: 'a', order: 2 },
      { id: 'b', order: 0 },
    ])

    const tasks = await taskDb.getAll()
    expect(tasks.map((task) => task.id)).toEqual(['b', 'a'])
  })
})

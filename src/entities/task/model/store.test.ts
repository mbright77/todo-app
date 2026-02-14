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
})

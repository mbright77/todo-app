import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskCard } from './TaskCard'
import { taskDb } from '../api/task.db'
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

describe('TaskCard', () => {
  beforeEach(async () => {
    await taskDb.clear()
  })

  afterEach(async () => {
    await taskDb.clear()
  })

  it('renders task title and toggles completion', async () => {
    const task = buildTask({ title: 'Buy bread' })
    await taskDb.add(task)

    render(<TaskCard task={task} />)

    expect(screen.getByLabelText('Task title')).toHaveValue('Buy bread')
    const checkbox = screen.getByLabelText('Mark Buy bread as completed')
    fireEvent.click(checkbox)

    const [updated] = await taskDb.getAll()
    expect(updated.completed).toBe(true)
  })
})

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { Task } from '../../../entities/task/model/types'
import { taskDb } from '../../../entities/task/api/task.db'
import { EditTaskForm } from './EditTaskForm'

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

describe('EditTaskForm', () => {
  beforeEach(async () => {
    await taskDb.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('clears the due date when emptied', async () => {
    const task = buildTask({ title: 'Has date', dueDate: '2024-01-01' })
    await taskDb.add(task)

    render(<EditTaskForm task={task} />)

    const dueInput = screen.getByLabelText('Due date')
    fireEvent.change(dueInput, { target: { value: '' } })
    fireEvent.blur(dueInput)

    await waitFor(async () => {
      const [updated] = await taskDb.getAll()
      expect(updated.dueDate).toBeNull()
    }, { timeout: 2000 })
  })

  it('saves title on blur', async () => {
    const task = buildTask({ title: 'Old title' })
    await taskDb.add(task)

    render(<EditTaskForm task={task} />)

    const titleInput = screen.getByLabelText('Task title')
    fireEvent.change(titleInput, { target: { value: 'New title' } })
    fireEvent.blur(titleInput)

    await waitFor(async () => {
      const [updated] = await taskDb.getAll()
      expect(updated.title).toBe('New title')
    }, { timeout: 2000 })
  })

  it('reverts to original title when emptied and blurred', async () => {
    const task = buildTask({ title: 'Keep me' })
    await taskDb.add(task)

    render(<EditTaskForm task={task} />)

    const titleInput = screen.getByLabelText('Task title')

    vi.useFakeTimers()
    fireEvent.change(titleInput, { target: { value: '   ' } })
    fireEvent.blur(titleInput)

    await act(async () => {
      await vi.runAllTimersAsync()
    })
    vi.useRealTimers()

    // Title input should revert to original value
    expect((titleInput as HTMLInputElement).value).toBe('Keep me')
    // DB should be unchanged
    const [persisted] = await taskDb.getAll()
    expect(persisted.title).toBe('Keep me')
  })
})


import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { taskDb } from '../../../entities/task/api/task.db'
import { DeleteButton } from './DeleteButton'
import type { Task } from '../../../entities/task/model/types'

const buildTask = (overrides: Partial<Task> = {}): Task => ({
  id: overrides.id ?? 'task-' + Math.random().toString(36).slice(2, 10),
  title: overrides.title ?? 'Task',
  description: null,
  completed: false,
  dueDate: null,
  order: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

describe('DeleteButton', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows an undo snackbar after clicking delete', async () => {
    const task = buildTask({ title: 'Delete me' })
    await taskDb.add(task)

    render(<DeleteButton taskId={task.id} />)

    fireEvent.click(screen.getByRole('button', { name: 'Delete task' }))

    await waitFor(() => {
      expect(screen.getByText('Task deleted')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument()
    })

    // Task should still be in DB (pending delete)
    const tasks = await taskDb.getAll()
    expect(tasks).toHaveLength(1)
  })

  it('deletes the task after the undo timeout expires', async () => {
    const task = buildTask({ title: 'Gone soon' })
    await taskDb.add(task)

    vi.useFakeTimers()
    render(<DeleteButton taskId={task.id} />)

    fireEvent.click(screen.getByRole('button', { name: 'Delete task' }))

    await act(async () => {
      await vi.runAllTimersAsync()
    })
    vi.useRealTimers()

    const tasks = await taskDb.getAll()
    expect(tasks).toHaveLength(0)
  })

  it('cancels the delete when undo is clicked', async () => {
    const task = buildTask({ title: 'Saved by undo' })
    await taskDb.add(task)

    vi.useFakeTimers()
    render(<DeleteButton taskId={task.id} />)

    fireEvent.click(screen.getByRole('button', { name: 'Delete task' }))

    // Advance just enough for React state to settle without firing the 5s timer
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0)
    })

    expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /undo/i }))

    await act(async () => {
      await vi.runAllTimersAsync()
    })
    vi.useRealTimers()

    const tasks = await taskDb.getAll()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe('Saved by undo')
  })
})


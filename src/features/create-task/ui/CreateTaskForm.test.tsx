import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { CreateTaskForm } from './CreateTaskForm'
import { taskDb } from '../../../entities/task/api/task.db'

describe('CreateTaskForm', () => {
  beforeEach(async () => {
    await taskDb.clear()
  })

  it('creates a task and calls onSuccess', async () => {
    const onSuccess = vi.fn()

    render(<CreateTaskForm initiallyExpanded={true} onSuccess={onSuccess} />)

    fireEvent.change(screen.getByRole('textbox', { name: /task title/i }), {
      target: { value: 'New task' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))

    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
    await waitFor(async () => {
      const tasks = await taskDb.getAll()
      expect(tasks).toHaveLength(1)
      expect(tasks[0].title).toBe('New task')
    })
  })

  it('does not create a task when title is empty', async () => {
    const onSuccess = vi.fn()

    render(<CreateTaskForm initiallyExpanded={true} onSuccess={onSuccess} />)

    fireEvent.click(screen.getByRole('button', { name: 'Add' }))

    await waitFor(async () => {
      const tasks = await taskDb.getAll()
      expect(tasks).toHaveLength(0)
    })
    expect(onSuccess).not.toHaveBeenCalled()
  })

  it('calls onCancel and does not create a task', async () => {
    const onCancel = vi.fn()

    render(<CreateTaskForm initiallyExpanded={true} onCancel={onCancel} />)

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onCancel).toHaveBeenCalled()
    const tasks = await taskDb.getAll()
    expect(tasks).toHaveLength(0)
  })
})

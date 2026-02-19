import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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
    })
  })
})

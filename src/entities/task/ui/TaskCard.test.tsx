import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskCard } from './TaskCard'
import { taskDb } from '../api/task.db'
import type { Task } from '../model/types'
import { CompleteCheckbox } from '../../../features/complete-task/ui/CompleteCheckbox'

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

    render(
      <TaskCard
        task={task}
        actions={<CompleteCheckbox taskId={task.id} completed={task.completed} label={task.title} />}
      />
    )

    const user = userEvent.setup()
    const checkbox = screen.getByLabelText('Mark Buy bread as completed')
    await user.click(checkbox)

    await waitFor(async () => {
      const [updated] = await taskDb.getAll()
      expect(updated.completed).toBe(true)
    })
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { Task } from '../../../entities/task/model/types'
import { taskDb } from '../../../entities/task/api/task.db'
import { ActivePage } from './ActivePage'
import { useTaskStore } from '../../../entities/task/model/store'
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

describe('ActivePage', () => {
  beforeEach(async () => {
    await taskDb.clear()
    const { filters } = useTaskStore.getState()
    useTaskStore.setState({ filter: filters[0] })
  })

  it('filters between active and today from the dialog', async () => {
    const todayKey = toDateKey(new Date())
    await taskDb.add(buildTask({ title: 'No due date' }))
    await taskDb.add(buildTask({ title: 'Due today', dueDate: todayKey }))

    render(<ActivePage />)

    await waitFor(() => {
      expect(screen.getByDisplayValue('No due date')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Due today')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText('Filters'))
    fireEvent.click(screen.getByText('Today'))

    await waitFor(() => {
      expect(screen.queryByDisplayValue('No due date')).not.toBeInTheDocument()
      expect(screen.getByDisplayValue('Due today')).toBeInTheDocument()
    })
  })
})

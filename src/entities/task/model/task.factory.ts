import type { Task } from './types'
import { createId } from '../../../shared/lib/id'
import { toIsoDateTime } from '../../../shared/lib/date'

export const buildTask = (
  input: { title: string; description?: string; dueDate?: string },
  order: number
): Task => {
  const now = toIsoDateTime(new Date())
  return {
    id: createId(),
    title: input.title.trim(),
    description: input.description?.trim() ?? null,
    completed: false,
    dueDate: input.dueDate ?? null,
    order,
    createdAt: now,
    updatedAt: now,
  }
}

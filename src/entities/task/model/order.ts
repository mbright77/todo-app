import { arrayMove } from '@dnd-kit/sortable'
import type { Task } from './types'

const REINDEX_GAP_THRESHOLD = 0.0001

export const buildOrderUpdates = (
  sortedTasks: Task[],
  activeId: string,
  overId: string
): { id: string; order: number }[] => {
  const oldIndex = sortedTasks.findIndex((task) => task.id === activeId)
  const newIndex = sortedTasks.findIndex((task) => task.id === overId)

  if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return []

  const reordered = arrayMove(sortedTasks, oldIndex, newIndex)
  const movedTask = reordered[newIndex]
  const prevTask = reordered[newIndex - 1]
  const nextTask = reordered[newIndex + 1]

  if (!prevTask && !nextTask) return []

  const gap = prevTask && nextTask ? nextTask.order - prevTask.order : undefined

  if (gap !== undefined && gap < REINDEX_GAP_THRESHOLD) {
    return reordered.map((task, index) => ({ id: task.id, order: index }))
  }

  let order = movedTask.order
  if (!prevTask && nextTask) {
    order = nextTask.order - 1
  } else if (prevTask && !nextTask) {
    order = prevTask.order + 1
  } else if (prevTask && nextTask) {
    order = (prevTask.order + nextTask.order) / 2
  }

  return [{ id: movedTask.id, order }]
}

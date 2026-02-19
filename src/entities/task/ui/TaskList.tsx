import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'
import { taskDb } from '../api/task.db'
import { TaskCard } from './TaskCard'
import { useTaskStore } from '../model/store'
import type { Task, TaskFilterKey } from '../model/types'
import { Box, Typography, Stack, CircularProgress, Collapse, type CollapseProps } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type TaskListProps = {
  filterKey?: TaskFilterKey
  emptyMessage?: string
}

const REINDEX_GAP_THRESHOLD = 0.0001

const buildOrderUpdates = (sortedTasks: Task[], activeId: string, overId: string) => {
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

type SortableTaskItemProps = { task: Task } & CollapseProps

function SortableTaskItem({ task, ...collapseProps }: SortableTaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })
  const adjustedTransform = transform
    ? { ...transform, scaleX: isDragging ? 1.02 : 1, scaleY: isDragging ? 1.02 : 1 }
    : undefined

  const style = {
    transform: CSS.Transform.toString(adjustedTransform ?? null),
    transition,
  }

  return (
    <Collapse {...collapseProps}>
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={{
          pb: 1,
          touchAction: 'manipulation',
          cursor: isDragging ? 'grabbing' : 'grab',
          '& .task-card': {
            boxShadow: isDragging ? 6 : undefined,
          },
        }}
      >
        <TaskCard task={task} />
      </Box>
    </Collapse>
  )
}

export function TaskList({ filterKey, emptyMessage }: TaskListProps) {
  const storeFilter = useTaskStore((state) => state.filter.key)
  const activeFilter = filterKey ?? storeFilter
  const tasks = useLiveQuery(() => taskDb.getByFilter(activeFilter), [activeFilter])
  const reorderTasks = useTaskStore((state) => state.reorderTasks)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  )

  const taskIds = useMemo(() => tasks?.map((task) => task.id) ?? [], [tasks])

  if (!tasks) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={32} />
      </Box>
    )
  }

  if (tasks.length === 0) {
    return (
      <Box sx={{ py: 6, px: 2, textAlign: 'center', bgcolor: 'action.hover', borderRadius: 4 }}>
        <Typography variant="body1" color="text.secondary">
          {emptyMessage ?? 'No tasks yet. Add one above.'}
        </Typography>
      </Box>
    )
  }

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const updates = buildOrderUpdates(tasks, String(active.id), String(over.id))
    await reorderTasks(updates)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <Stack spacing={0}>
          <TransitionGroup component={null}>
            {tasks.map((task) => (
              <SortableTaskItem key={task.id} task={task} />
            ))}
          </TransitionGroup>
        </Stack>
      </SortableContext>
    </DndContext>
  )
}

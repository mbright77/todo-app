import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo, useState } from 'react'
import { taskDb } from '../../../entities/task/api/task.db'
import { TaskCard } from '../../../entities/task/ui/TaskCard'
import { TaskList } from '../../../entities/task/ui/TaskList'
import { useTaskStore } from '../../../entities/task/model/store'
import type { Task, TaskFilterKey } from '../../../entities/task/model/types'
import { CompleteCheckbox } from '../../complete-task/ui/CompleteCheckbox'
import { EditTaskForm } from '../../edit-task/ui/EditTaskForm'
import { DeleteButton } from '../../delete-task/ui/DeleteButton'
import { Box, Collapse, Stack, type CollapseProps } from '@mui/material'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type ReorderableTaskListProps = {
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

type SortableTaskItemProps = { task: Task; isActiveDrag?: boolean } & CollapseProps

function SortableTaskItem({ task, isActiveDrag, ...collapseProps }: SortableTaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
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
        sx={{
          pb: 1,
          touchAction: 'none',
          opacity: isActiveDrag ? 0.98 : 1,
          '& .task-card': {
            boxShadow: isDragging ? 6 : undefined,
          },
        }}
      >
        <TaskCard
          task={task}
          isDragging={isDragging}
          dragHandleProps={{
            ref: setActivatorNodeRef,
            ...attributes,
            ...listeners,
          }}
          actions={
            <CompleteCheckbox taskId={task.id} completed={task.completed} label={task.title} />
          }
          content={<EditTaskForm task={task} />}
          endActions={<DeleteButton taskId={task.id} />}
        />
      </Box>
    </Collapse>
  )
}

export function ReorderableTaskList({ filterKey, emptyMessage }: ReorderableTaskListProps) {
  const storeFilter = useTaskStore((state) => state.filter.key)
  const activeFilter = filterKey ?? storeFilter
  const tasks = useLiveQuery(() => taskDb.getByFilter(activeFilter), [activeFilter])
  const reorderTasks = useTaskStore((state) => state.reorderTasks)
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 500, tolerance: 10 } })
  )

  const taskIds = useMemo(() => tasks?.map((task) => task.id) ?? [], [tasks])
  const items = useMemo(
    () =>
      tasks?.map((task) => (
        <SortableTaskItem key={task.id} task={task} isActiveDrag={task.id === activeDragId} />
      )) ?? [],
    [tasks, activeDragId]
  )

  const onDragStart = (event: DragStartEvent) => {
    setActiveDragId(String(event.active.id))
  }

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveDragId(null)
    if (!over || active.id === over.id) return

    const updates = buildOrderUpdates(tasks ?? [], String(active.id), String(over.id))
    await reorderTasks(updates)
  }

  const onDragCancel = () => {
    setActiveDragId(null)
  }

  const list = (
    <TaskList items={items} emptyMessage={emptyMessage} isLoading={!tasks} useTransitions={false} />
  )

  if (!tasks || tasks.length === 0) {
    return list
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <Stack spacing={0}>
          {items}
        </Stack>
      </SortableContext>
    </DndContext>
  )
}

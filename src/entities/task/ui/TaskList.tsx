import { useLiveQuery } from 'dexie-react-hooks'
import { taskDb } from '../api/task.db'
import { TaskCard } from './TaskCard'
import { useTaskStore } from '../model/store'
import type { TaskFilterKey } from '../model/types'
import { Box, Typography, Stack, CircularProgress, Collapse } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'

type TaskListProps = {
  filterKey?: TaskFilterKey
  emptyMessage?: string
}

export function TaskList({ filterKey, emptyMessage }: TaskListProps) {
  const storeFilter = useTaskStore((state) => state.filter.key)
  const activeFilter = filterKey ?? storeFilter
  const tasks = useLiveQuery(() => taskDb.getByFilter(activeFilter), [activeFilter])

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

  return (
    <Stack spacing={0}>
      <TransitionGroup component={null}>
        {tasks.map((task) => (
          <Collapse key={task.id}>
            <Box sx={{ pb: 1 }}>
              <TaskCard task={task} />
            </Box>
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  )
}


import type { Task } from '../model/types'
import { CompleteCheckbox } from '../../../features/complete-task/ui/CompleteCheckbox'
import { DeleteButton } from '../../../features/delete-task/ui/DeleteButton'
import { EditTaskForm } from '../../../features/edit-task/ui/EditTaskForm'
import { formatDate } from '../../../shared/lib/date'
import { Box, Paper, Typography } from '@mui/material'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        mb: 1,
        p: 1.5,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
        borderRadius: 3,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => theme.shadows[2],
        },
      }}
    >
      <Box sx={{ mt: 0.5 }}>
        <CompleteCheckbox taskId={task.id} completed={task.completed} label={task.title} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <EditTaskForm task={task} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
        <DeleteButton taskId={task.id} />
        {task.dueDate ? (
          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
            {formatDate(task.dueDate)}
          </Typography>
        ) : null}
      </Box>
    </Paper>
  )
}

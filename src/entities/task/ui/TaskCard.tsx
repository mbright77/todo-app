import type { Task } from '../model/types'
import { CompleteCheckbox } from '../../../features/complete-task/ui/CompleteCheckbox'
import { DeleteButton } from '../../../features/delete-task/ui/DeleteButton'
import { EditTaskForm } from '../../../features/edit-task/ui/EditTaskForm'
import { Box, Paper } from '@mui/material'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Paper
      className="task-card"
      variant="outlined"
      sx={{
        mb: 1,
        p: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderRadius: 3,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => theme.shadows[2],
        },
      }}
    >
      <Box>
        <CompleteCheckbox taskId={task.id} completed={task.completed} label={task.title} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <EditTaskForm task={task} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DeleteButton taskId={task.id} />
      </Box>
    </Paper>
  )
}

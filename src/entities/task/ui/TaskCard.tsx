import type { HTMLAttributes, Ref, ReactNode } from 'react'
import type { Task } from '../model/types'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { Box, IconButton, Paper } from '@mui/material'

type TaskCardProps = {
  task: Task
  isDragging?: boolean
  dragHandleProps?: HTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement> }
  actions?: ReactNode
  content?: ReactNode
  endActions?: ReactNode
}

export function TaskCard({ task, isDragging = false, dragHandleProps, actions, content, endActions }: TaskCardProps) {
  const dragHandleStyles = dragHandleProps
    ? {
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      }
    : {}
  const { ref: dragHandleRef, color: _color, ...dragHandleAttributes } = dragHandleProps ?? {}

  return (
    <Paper
      className="task-card"
      variant="outlined"
      sx={[
        {
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
        },
        isDragging && {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => theme.shadows[6],
        },
      ]}
    >
      {dragHandleProps ? (
        <IconButton
          {...dragHandleAttributes}
          ref={dragHandleRef}
          aria-label={`Drag to reorder ${task.title}`}
          aria-roledescription="sortable"
          size="small"
          sx={{
            mr: 0.5,
            ...dragHandleStyles,
          }}
        >
          <DragIndicatorIcon fontSize="small" />
        </IconButton>
      ) : null}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {actions}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {content}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {endActions}
      </Box>
    </Paper>
  )
}

import { useState } from 'react'
import type { Task } from '../../../entities/task/model/types'
import { useTaskStore } from '../../../entities/task/model/store'
import { TextField, Box } from '@mui/material'

type EditTaskFormProps = {
  task: Task
}

export function EditTaskForm({ task }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? '')
  const [dueDate, setDueDate] = useState(task.dueDate ?? '')
  const updateTask = useTaskStore((state) => state.updateTask)

  const onBlur = async () => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setTitle(task.title)
      setDescription(task.description ?? '')
      setDueDate(task.dueDate ?? '')
      return
    }

    if (
      trimmedTitle !== task.title ||
      description !== (task.description ?? '') ||
      dueDate !== (task.dueDate ?? '')
    ) {
      await updateTask(task.id, {
        title: trimmedTitle,
        description: description.trim() || null,
        dueDate: dueDate.trim() || null,
      })
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1, minWidth: 0 }}>
      <TextField
        label="Task title"
        variant="standard"
        fullWidth
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={onBlur}
        placeholder="Task title"
        slotProps={{
          input: {
            disableUnderline: true,
            sx: { fontWeight: 600, fontSize: '1.125rem' }
          },
          inputLabel: {
            shrink: true,
            sx: { clipPath: 'inset(50%)', height: 1, overflow: 'hidden', position: 'absolute', whiteSpace: 'nowrap', width: 1 }
          }
        }}
      />
      <TextField
        label="Notes"
        variant="standard"
        fullWidth
        multiline
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        onBlur={onBlur}
        placeholder="Add details"
        slotProps={{
          input: {
            disableUnderline: true,
            sx: { fontSize: '0.875rem', color: 'text.secondary' }
          },
          inputLabel: {
            shrink: true,
            sx: { clipPath: 'inset(50%)', height: 1, overflow: 'hidden', position: 'absolute', whiteSpace: 'nowrap', width: 1 }
          }
        }}
      />
      <TextField
        label="Due date"
        type="date"
        variant="standard"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
        onBlur={onBlur}
        slotProps={{
          input: {
            sx: { fontSize: '0.75rem', color: 'text.secondary' }
          },
          inputLabel: {
            shrink: true,
            sx: { clipPath: 'inset(50%)', height: 1, overflow: 'hidden', position: 'absolute', whiteSpace: 'nowrap', width: 1 }
          }
        }}
      />
    </Box>
  )
}

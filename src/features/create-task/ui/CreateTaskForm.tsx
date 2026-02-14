import { useState, useRef, useEffect } from 'react'
import { useTaskStore } from '../../../entities/task/model/store'
import { Button as MuiButton, TextField, Box, Collapse, Paper } from '@mui/material'
import { Button } from '../../../shared/ui/Button'
import AddIcon from '@mui/icons-material/Add'

export function CreateTaskForm({ initiallyExpanded = false }: { initiallyExpanded?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  
  const titleInputRef = useRef<HTMLInputElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  
  const createTask = useTaskStore((state) => state.createTask)

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        titleInputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isExpanded])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim()) return
    await createTask({ title, description, dueDate: dueDate.trim() || undefined })
    setTitle('')
    setDescription('')
    setDueDate('')
    setIsExpanded(false)
    toggleButtonRef.current?.focus()
  }

  const handleCancel = () => {
    setIsExpanded(false)
    toggleButtonRef.current?.focus()
  }

  return (
    <Box>
      <Box sx={{ mb: isExpanded ? 2 : 0 }}>
        {!isExpanded && (
          <Button
            ref={toggleButtonRef}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsExpanded(true)}
            aria-expanded="false"
            aria-controls="create-task-form"
          >
            Add New Task
          </Button>
        )}
      </Box>

      <Collapse in={isExpanded}>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.50' : 'background.paper'),
            borderStyle: 'dashed',
          }}
        >
          <Box component="form" id="create-task-form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
            <TextField
              inputRef={titleInputRef}
              label="Task title"
              variant="outlined"
              fullWidth
              size="small"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Add a task"
              required
            />
            <TextField
              label="Notes"
              variant="outlined"
              fullWidth
              size="small"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional description"
              multiline
              rows={2}
            />
            <TextField
              label="Due date"
              variant="outlined"
              fullWidth
              size="small"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button type="submit" variant="contained" startIcon={<AddIcon />}>
                Add
              </Button>
              <MuiButton onClick={handleCancel}>
                Cancel
              </MuiButton>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  )
}

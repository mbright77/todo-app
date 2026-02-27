import { useState, useRef, useEffect } from 'react'
import { useTaskStore } from '../../../entities/task/model/store'
import { TextField, Box, Collapse, Paper } from '@mui/material'
import { Button } from '../../../shared/ui/Button'
import AddIcon from '@mui/icons-material/Add'

export function CreateTaskForm({ 
  initiallyExpanded = false,
  onSuccess,
  onCancel 
}: { 
  initiallyExpanded?: boolean,
  onSuccess?: () => void,
  onCancel?: () => void
}) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const titleInputRef = useRef<HTMLInputElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  
  const createTask = useTaskStore((state) => state.createTask)

  useEffect(() => {
    // Only auto-focus when used standalone (not inside a Dialog — Dialog manages
    // its own focus trap and the setTimeout races with MUI's aria-hidden logic,
    // causing the "Blocked aria-hidden on focused element" console warning).
    if (isExpanded && !initiallyExpanded) {
      const timer = setTimeout(() => {
        titleInputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isExpanded, initiallyExpanded])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setDueDate('')
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim() || isSubmitting) return
    setIsSubmitting(true)
    try {
      await createTask({ title, description, dueDate: dueDate.trim() || undefined })
      resetForm()
      if (initiallyExpanded) {
        // Inside a dialog: let the parent close the dialog cleanly.
        onSuccess?.()
      } else {
        // Standalone: collapse the inline form and restore focus to the toggle button.
        setIsExpanded(false)
        toggleButtonRef.current?.focus()
        onSuccess?.()
      }
    } catch (error) {
      console.error('Failed to create task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    resetForm()
    if (initiallyExpanded) {
      onCancel?.()
    } else {
      setIsExpanded(false)
      toggleButtonRef.current?.focus()
      onCancel?.()
    }
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
            aria-expanded={isExpanded}
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
            bgcolor: 'action.hover',
            borderStyle: 'dashed',
            borderColor: 'divider',
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
              autoFocus={initiallyExpanded}
              slotProps={{
                input: {
                  sx: { bgcolor: 'background.paper' }
                }
              }}
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
              slotProps={{
                input: {
                  sx: { bgcolor: 'background.paper' }
                }
              }}
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
                input: {
                  sx: { bgcolor: 'background.paper' }
                }
              }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button type="submit" startIcon={<AddIcon />} disabled={isSubmitting}>
                Add
              </Button>
              <Button variant="text" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  )
}

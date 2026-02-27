import { useEffect, useRef, useState } from 'react'
import type { Task } from '../../../entities/task/model/types'
import { useTaskStore } from '../../../entities/task/model/store'
import { TextField, Box } from '@mui/material'
import { VISUALLY_HIDDEN_SX } from '../../../shared/ui/sx'

type EditTaskFormProps = {
  task: Task
}

export function EditTaskForm({ task }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? '')
  const [dueDate, setDueDate] = useState(task.dueDate ?? '')
  const updateTask = useTaskStore((state) => state.updateTask)

  // Track which field (if any) is currently focused so we don't reset it.
  const focusedFieldRef = useRef<'title' | 'description' | 'dueDate' | null>(null)

  // 6.10 — reset local state when a different task is shown in this slot.
  useEffect(() => {
    if (focusedFieldRef.current !== 'title') setTitle(task.title)
    if (focusedFieldRef.current !== 'description') setDescription(task.description ?? '')
    if (focusedFieldRef.current !== 'dueDate') setDueDate(task.dueDate ?? '')
  }, [task.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // 6.9 — coalesce rapid onBlur saves (e.g. title → description focus shift).
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // B7 — clear any pending save timer on unmount so a stale write never fires
  // after the component is gone.
  useEffect(() => {
    return () => {
      if (saveTimerRef.current !== null) {
        clearTimeout(saveTimerRef.current)
        saveTimerRef.current = null
      }
    }
  }, [])

  const scheduleSave = (latestTitle: string, latestDescription: string, latestDueDate: string) => {
    if (saveTimerRef.current !== null) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(async () => {
      saveTimerRef.current = null
      const trimmedTitle = latestTitle.trim()
      if (!trimmedTitle) {
        setTitle(task.title)
        setDescription(task.description ?? '')
        setDueDate(task.dueDate ?? '')
        return
      }
      if (
        trimmedTitle !== task.title ||
        latestDescription !== (task.description ?? '') ||
        latestDueDate !== (task.dueDate ?? '')
      ) {
        try {
          await updateTask(task.id, {
            title: trimmedTitle,
            description: latestDescription.trim() || null,
            dueDate: latestDueDate.trim() || null,
          })
        } catch (error) {
          console.error('Failed to save task edits:', error)
        }
      }
    }, 50)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1, minWidth: 0 }}>
      <TextField
        label="Task title"
        variant="standard"
        fullWidth
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onFocus={() => { focusedFieldRef.current = 'title' }}
        onBlur={() => {
          focusedFieldRef.current = null
          scheduleSave(title, description, dueDate)
        }}
        placeholder="Task title"
        slotProps={{
          input: {
            disableUnderline: true,
            sx: { fontWeight: 600, fontSize: '1.125rem' }
          },
          inputLabel: {
            shrink: true,
            sx: VISUALLY_HIDDEN_SX,
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
        onFocus={() => { focusedFieldRef.current = 'description' }}
        onBlur={() => {
          focusedFieldRef.current = null
          scheduleSave(title, description, dueDate)
        }}
        placeholder="Add details"
        slotProps={{
          input: {
            disableUnderline: true,
            sx: { fontSize: '0.875rem', color: 'text.secondary' }
          },
          inputLabel: {
            shrink: true,
            sx: VISUALLY_HIDDEN_SX,
          }
        }}
      />
      <TextField
        label="Due date"
        type="date"
        variant="standard"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
        onFocus={() => { focusedFieldRef.current = 'dueDate' }}
        onBlur={() => {
          focusedFieldRef.current = null
          scheduleSave(title, description, dueDate)
        }}
        slotProps={{
          input: {
            sx: { fontSize: '0.75rem', color: 'text.secondary' }
          },
          inputLabel: {
            shrink: true,
            sx: VISUALLY_HIDDEN_SX,
          }
        }}
      />
    </Box>
  )
}

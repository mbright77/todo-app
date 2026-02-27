import { useEffect, useRef, useState } from 'react'
import { useTaskStore } from '../../../entities/task/model/store'
import { IconButton } from '../../../shared/ui/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { Snackbar, Button } from '@mui/material'

type DeleteButtonProps = {
  taskId: string
}

const UNDO_TIMEOUT_MS = 5000

export function DeleteButton({ taskId }: DeleteButtonProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask)
  const [pendingDelete, setPendingDelete] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // B3 — clear the timer on unmount so deletion never fires after the component
  // is gone (e.g. user navigates away before the 5 s undo window expires).
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  const commitDelete = async () => {
    setPendingDelete(false)
    try {
      await deleteTask(taskId) // B4 — await so errors are caught
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const handleDeleteClick = () => {
    setPendingDelete(true)
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      void commitDelete()
    }, UNDO_TIMEOUT_MS)
  }

  const handleUndo = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setPendingDelete(false)
    // Restore focus to the delete button
    buttonRef.current?.focus()
  }

  const handleSnackbarClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    // Do not close on clickaway so the user can still undo
    if (reason === 'clickaway') return
    if (reason === 'timeout') {
      // B5 — MUI fires onClose at UNDO_TIMEOUT_MS; cancel our own timer and
      // commit the deletion here so there is only one code path that deletes.
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      void commitDelete()
    }
  }

  return (
    <>
      <IconButton
        ref={buttonRef}
        onClick={handleDeleteClick}
        aria-label="Delete task"
        disabled={pendingDelete}
      >
        <DeleteIcon />
      </IconButton>

      <Snackbar
        open={pendingDelete}
        autoHideDuration={UNDO_TIMEOUT_MS}
        onClose={handleSnackbarClose}
        message="Task deleted"
        action={
          <Button color="secondary" size="small" onClick={handleUndo}>
            Undo
          </Button>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  )
}

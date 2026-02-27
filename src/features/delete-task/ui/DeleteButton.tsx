import { useRef, useState } from 'react'
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

  const handleDeleteClick = () => {
    setPendingDelete(true)
    timerRef.current = setTimeout(() => {
      setPendingDelete(false)
      deleteTask(taskId)
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
    if (reason === 'timeout') {
      // Timer has already fired — nothing to do here; state is cleared by the timer callback
    }
    // Do not close on clickaway so the user can still undo
    if (reason === 'clickaway') return
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

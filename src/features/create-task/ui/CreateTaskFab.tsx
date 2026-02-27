import { useState } from 'react'
import { Fab, Dialog, DialogTitle, DialogContent, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { CreateTaskForm } from './CreateTaskForm'

export function CreateTaskFab() {
  const [open, setOpen] = useState(false)
  const dialogTitleId = 'create-task-dialog-title'

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Fab
        color="primary"
        aria-label="Add task"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 'calc(32px + env(safe-area-inset-bottom))',
          right: 'calc(32px + env(safe-area-inset-right))',
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby={dialogTitleId}
      >
        <DialogTitle id={dialogTitleId}>Create New Task</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Box sx={{ mt: 1 }}>
            <CreateTaskForm
              initiallyExpanded={true}
              onSuccess={handleClose}
              onCancel={handleClose}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

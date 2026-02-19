import { Box, Paper, Typography, IconButton, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { APP_NAME } from '../../../shared/config/constants'

export function HelpPage() {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton aria-label="Back" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
            Help
          </Typography>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            About {APP_NAME}
          </Typography>
        </Box>
      </Box>

      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1" color="text.secondary">
            {APP_NAME} is a local-only, offline-first to-do list. Your tasks are stored on this device in the
            browser (no accounts, no server).
          </Typography>

          <Divider />

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Adding tasks
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tap the plus button to create a task. New tasks appear at the top of your lists.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            If you set a due date in the future, the task shows up in Upcoming.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
            Marking tasks as done
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Use the checkbox to mark a task complete. Completed tasks move to the Completed tab.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
            Ordering
          </Typography>
          <Typography variant="body1" color="text.secondary">
            To reorder tasks, press and hold (about half a second on mobile), then drag a card up or down.
            The order is global and stays consistent across tabs.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
            Deleting
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The trash button deletes a task entirely.
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

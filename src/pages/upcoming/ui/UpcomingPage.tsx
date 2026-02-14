import { TaskList } from '../../../entities/task/ui/TaskList'
import { Typography, Box, Paper, Chip } from '@mui/material'

export function UpcomingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
            Upcoming
          </Typography>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Upcoming Tasks
          </Typography>
        </Box>
        <Chip label="Soon" variant="outlined" color="primary" />
      </Box>

      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4 }}>
        <TaskList
          filterKey="upcoming"
          emptyMessage="No upcoming tasks yet."
        />
      </Paper>
    </Box>
  )
}

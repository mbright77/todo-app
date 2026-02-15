import { useState } from 'react'
import { TaskList } from '../../../entities/task/ui/TaskList'
import { IconButton, Typography, Box, Paper } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { TaskFilters } from '../../../features/search-tasks/ui/TaskFilters'

export function ActivePage() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
            In Progress
          </Typography>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Active
          </Typography>
        </Box>
        <IconButton onClick={() => setIsFilterModalOpen(true)} aria-label="Filters">
          <FilterListIcon />
        </IconButton>
      </Box>

      {isFilterModalOpen && <TaskFilters onClose={() => setIsFilterModalOpen(false)} />}

      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TaskList
            emptyMessage="No active tasks. Use the plus button below to add one."
          />
        </Box>
      </Paper>
    </Box>
  )
}

import { useState } from 'react'
import { ReorderableTaskList } from '../../../features/reorder-tasks/ui/ReorderableTaskList'
import { Typography, Box, Paper } from '@mui/material'
import { IconButton } from '../../../shared/ui/IconButton'
import FilterListIcon from '@mui/icons-material/FilterList'
import { FilterTasksDialog } from '../../../features/filter-tasks/ui/FilterTasksDialog'

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

      {isFilterModalOpen && <FilterTasksDialog onClose={() => setIsFilterModalOpen(false)} />}

      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ReorderableTaskList emptyMessage="No active tasks. Use the plus button below to add one." />
        </Box>
      </Paper>
    </Box>
  )
}

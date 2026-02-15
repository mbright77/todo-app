import { useTaskStore } from '../../../entities/task/model/store'
import { Dialog, DialogTitle, List, ListItemButton, ListItemText } from '@mui/material'

type TaskFiltersProps = {
  onClose: () => void
}

export function TaskFilters({ onClose }: TaskFiltersProps) {
  const { filters, filter, setFilter } = useTaskStore()
  const visibleFilters = filters.filter((item) => item.key === 'active' || item.key === 'today')

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Filter Tasks</DialogTitle>
      <List sx={{ pt: 0 }}>
        {visibleFilters.map((f) => (
          <ListItemButton
            key={f.key}
            selected={f.key === filter.key}
            onClick={() => {
              setFilter(f)
              onClose()
            }}
          >
            <ListItemText primary={f.label} />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  )
}

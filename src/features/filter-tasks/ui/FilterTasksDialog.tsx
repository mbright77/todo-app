import { useTaskStore } from '../../../entities/task/model/store'
import { Dialog, DialogTitle, List, ListItemButton, ListItemText } from '@mui/material'
import { FILTER_DIALOG_KEYS } from '../../../shared/config/constants'

type FilterTasksDialogProps = {
  onClose: () => void
}

export function FilterTasksDialog({ onClose }: FilterTasksDialogProps) {
  const { filters, filter, setFilter } = useTaskStore()
  const visibleFilters = filters.filter((item) => (FILTER_DIALOG_KEYS as readonly string[]).includes(item.key))
  const titleId = 'filter-tasks-dialog-title'

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs" aria-labelledby={titleId}>
      <DialogTitle id={titleId}>Filter Tasks</DialogTitle>
      <List sx={{ pt: 0 }} role="listbox" aria-label="Select filter">
        {visibleFilters.map((f) => (
          <ListItemButton
            key={f.key}
            selected={f.key === filter.key}
            role="option"
            aria-selected={f.key === filter.key}
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

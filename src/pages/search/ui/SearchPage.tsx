import { useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { taskDb } from '../../../entities/task/api/task.db'
import { TaskList } from '../../../entities/task/ui/TaskList'
import { Typography, Box, Paper, TextField, InputAdornment } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '../../../shared/ui/IconButton'
import { TaskCard } from '../../../entities/task/ui/TaskCard'
import { CompleteCheckbox } from '../../../features/complete-task/ui/CompleteCheckbox'
import { EditTaskForm } from '../../../features/edit-task/ui/EditTaskForm'
import { DeleteButton } from '../../../features/delete-task/ui/DeleteButton'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const trimmedQuery = query.trim()
  const results = useLiveQuery(() => taskDb.searchByTitle(trimmedQuery), [trimmedQuery])

  const totalLabel = useMemo(() => {
    if (!results) return 'Searching'
    if (!trimmedQuery) return 'Type to search'
    if (results.length === 0) return 'No matches'
    return `${results.length} match${results.length === 1 ? '' : 'es'}`
  }, [results, trimmedQuery])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
            Search
          </Typography>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Find Tasks
          </Typography>
        </Box>
        <Box role="status" aria-live="polite" aria-atomic="true">
          <Typography variant="body2" color="text.secondary">
            {totalLabel}
          </Typography>
        </Box>
      </Box>

      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Search tasks"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tasks by title"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: trimmedQuery ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setQuery('')}
                      edge="end"
                      aria-label="Clear search"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />

          {!trimmedQuery ? (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
              Start typing to search your tasks.
            </Typography>
          ) : results && results.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
              No tasks match that search.
            </Typography>
          ) : results ? (
            <TaskList
              items={results.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  actions={
                    <CompleteCheckbox
                      taskId={task.id}
                      completed={task.completed}
                      label={task.title}
                    />
                  }
                  content={<EditTaskForm task={task} />}
                  endActions={<DeleteButton taskId={task.id} />}
                />
              ))}
              emptyMessage="No tasks match that search."
            />
          ) : (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
              Searching tasks...
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

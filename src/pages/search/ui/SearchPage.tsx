import { useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { TaskCard } from '../../../entities/task/ui/TaskCard'
import { taskDb } from '../../../entities/task/api/task.db'
import { Typography, Box, Paper, Chip, TextField, IconButton, InputAdornment, List } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

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
        <Chip label={totalLabel} variant="outlined" color="info" />
      </Box>

      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
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
                    <IconButton onClick={() => setQuery('')} edge="end">
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
            <List disablePadding>
              {results.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </List>
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

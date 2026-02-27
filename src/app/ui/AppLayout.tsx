import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { TaskNav } from './TaskNav'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { ThemeToggle } from '../../features/switch-theme/ui/ThemeToggle'
import { CreateTaskFab } from '../../features/create-task/ui/CreateTaskFab'
import { APP_NAME } from '../../shared/config/constants'
import { IconButton } from '../../shared/ui/IconButton'
import { SwUpdateSnackbar } from './SwUpdateSnackbar'

export function AppLayout() {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {APP_NAME}
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/help')} aria-label="Help">
            <HelpOutlineIcon />
          </IconButton>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 2, pb: 10, flexGrow: 1 }}>
        <TaskNav />
        <Box component="main">
          <Outlet />
        </Box>
      </Container>

      <CreateTaskFab />
      <SwUpdateSnackbar />
    </Box>
  )
}

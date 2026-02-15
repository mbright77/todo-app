import { AppBar, Box, Container, Toolbar, Typography, IconButton, Fab, Dialog, DialogTitle, DialogContent, useColorScheme, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { TaskNav } from '../../shared/ui/TaskNav'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { CreateTaskForm } from '../../features/create-task/ui/CreateTaskForm'

export function AppLayout() {
  const { mode, setMode, systemMode } = useColorScheme()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClose = () => setIsAddDialogOpen(false)
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleSetMode = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode)
    handleMenuClose()
  }

  const resolvedMode = mode === 'system' ? systemMode : mode

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          bgcolor: 'background.paper', 
          color: 'text.primary',
          borderBottom: '1px solid', 
          borderColor: 'divider' 
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Todo App
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={handleMenuOpen}
            aria-label="theme settings"
          >
            {mode === 'system' ? <SettingsBrightnessIcon /> : resolvedMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => handleSetMode('light')} selected={mode === 'light'}>
              <ListItemIcon><LightModeIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Light</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSetMode('dark')} selected={mode === 'dark'}>
              <ListItemIcon><DarkModeIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Dark</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleSetMode('system')} selected={mode === 'system'}>
              <ListItemIcon><SettingsBrightnessIcon fontSize="small" /></ListItemIcon>
              <ListItemText>System</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 2, pb: 10, flexGrow: 1 }}>
        <TaskNav />
        <Box component="main">
          <Outlet />
        </Box>
      </Container>
      
      <Fab 
        color="primary" 
        aria-label="add task" 
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        onClick={() => setIsAddDialogOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog open={isAddDialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Box sx={{ mt: 1 }}>
            <CreateTaskForm initiallyExpanded={true} />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

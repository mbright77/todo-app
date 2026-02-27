import { useState } from 'react'
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { useColorScheme } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

const MODES = [
  { value: 'light' as const, label: 'Light', Icon: LightModeIcon },
  { value: 'dark' as const, label: 'Dark', Icon: DarkModeIcon },
  { value: 'system' as const, label: 'System', Icon: SettingsBrightnessIcon },
]

export function ThemeToggle() {
  const { mode, setMode, systemMode } = useColorScheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const resolvedMode = mode === 'system' ? systemMode : mode

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleSelect = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode)
    handleClose()
  }

  const currentLabel =
    mode === 'system' ? 'System theme' : resolvedMode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  const CurrentIcon =
    mode === 'system' ? SettingsBrightnessIcon : resolvedMode === 'dark' ? LightModeIcon : DarkModeIcon

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
        aria-label={currentLabel}
        aria-haspopup="menu"
        aria-expanded={open || undefined}
        aria-controls={open ? 'theme-menu' : undefined}
      >
        <CurrentIcon />
      </IconButton>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        MenuListProps={{ role: 'menu' }}
      >
        {MODES.map(({ value, label, Icon }) => (
          <MenuItem
            key={value}
            onClick={() => handleSelect(value)}
            role="menuitemradio"
            aria-checked={mode === value}
          >
            <ListItemIcon><Icon fontSize="small" /></ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

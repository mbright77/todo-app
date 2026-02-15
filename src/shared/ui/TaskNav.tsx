import { Tabs, Tab, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/active', label: 'Active' },
  { to: '/upcoming', label: 'Upcoming' },
  { to: '/completed', label: 'Completed' },
  { to: '/search', label: 'Search' },
]

export function TaskNav() {
  const { pathname } = useLocation()
  
  const activeTab = LINKS.findIndex(link => link.to === pathname)
  const value = activeTab === -1 ? 0 : activeTab

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs value={value} aria-label="Task views">
        {LINKS.map((link) => (
          <Tab 
            key={link.to} 
            label={link.label} 
            component={Link} 
            to={link.to} 
          />
        ))}
      </Tabs>
    </Box>
  )
}

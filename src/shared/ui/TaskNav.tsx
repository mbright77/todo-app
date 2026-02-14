import { NavLink } from 'react-router-dom'
import styles from './TaskNav.module.css'

const LINKS = [
  { to: '/today', label: 'Today' },
  { to: '/upcoming', label: 'Upcoming' },
  { to: '/completed', label: 'Completed' },
  { to: '/search', label: 'Search' },
]

export function TaskNav() {
  return (
    <nav className={styles.nav} aria-label="Task views">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            [styles.link, isActive ? styles.linkActive : ''].filter(Boolean).join(' ')
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

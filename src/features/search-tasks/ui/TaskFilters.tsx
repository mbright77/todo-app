import { useTaskStore } from '../../../entities/task/model/store'
import { Modal } from '../../../shared/ui/Modal'
import styles from './TaskFilters.module.css'

type TaskFiltersProps = {
  onClose: () => void
}

export function TaskFilters({ onClose }: TaskFiltersProps) {
  const { filters, filter, setFilter } = useTaskStore()
  const visibleFilters = filters.filter((item) => item.key === 'all' || item.key === 'active')

  return (
    <Modal onClose={onClose}>
      <ul className={styles.list}>
        {visibleFilters.map((f) => (
          <li key={f.key}>
            <button
              className={styles.button}
              data-active={f.key === filter.key}
              onClick={() => {
                setFilter(f)
                onClose()
              }}
            >
              {f.label}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

import { useTaskStore } from '../../../entities/task/model/store'
import { Modal } from '../../../shared/ui/Modal'
import styles from './TaskFilters.module.css'

type TaskFiltersProps = {
  onClose: () => void
}

export function TaskFilters({ onClose }: TaskFiltersProps) {
  const { filters, filter, setFilter } = useTaskStore()

  return (
    <Modal onClose={onClose}>
      <ul className={styles.list}>
        {filters.map((f) => (
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

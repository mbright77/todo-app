import { useTaskStore } from '../../../entities/task/model/store'
import styles from './TaskFilters.module.css'

export function TaskFilters() {
  const { filters, filter, setFilter } = useTaskStore()

  return (
    <div className={styles.filters}>
      {filters.map((item) => (
        <button
          key={item.key}
          className={item.key === filter.key ? styles.active : styles.button}
          type="button"
          onClick={() => setFilter(item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

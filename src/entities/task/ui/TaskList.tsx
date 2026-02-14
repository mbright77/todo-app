import { useLiveQuery } from 'dexie-react-hooks'
import { taskDb } from '../api/task.db'
import { TaskCard } from './TaskCard'
import { useTaskStore } from '../model/store'
import type { TaskFilterKey } from '../model/types'
import styles from './TaskList.module.css'

type TaskListProps = {
  filterKey?: TaskFilterKey
  emptyMessage?: string
}

export function TaskList({ filterKey, emptyMessage }: TaskListProps) {
  const storeFilter = useTaskStore((state) => state.filter.key)
  const activeFilter = filterKey ?? storeFilter
  const tasks = useLiveQuery(() => taskDb.getByFilter(activeFilter), [activeFilter])

  if (!tasks) {
    return <p className={styles.empty}>Loading tasks...</p>
  }

  if (tasks.length === 0) {
    return <p className={styles.empty}>{emptyMessage ?? 'No tasks yet. Add one above.'}</p>
  }

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

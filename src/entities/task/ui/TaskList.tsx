import { useLiveQuery } from 'dexie-react-hooks'
import { taskDb } from '../api/task.db'
import { TaskCard } from './TaskCard'
import { useTaskStore } from '../model/store'
import styles from './TaskList.module.css'

export function TaskList() {
  const filter = useTaskStore((state) => state.filter.key)
  const tasks = useLiveQuery(() => taskDb.getByFilter(filter), [filter])

  if (!tasks) {
    return <p className={styles.empty}>Loading tasks...</p>
  }

  if (tasks.length === 0) {
    return <p className={styles.empty}>No tasks yet. Add one above.</p>
  }

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

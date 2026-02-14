import styles from './TaskCard.module.css'
import type { Task } from '../model/types'
import { useTaskStore } from '../model/store'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { toggleTask, deleteTask, updateTask } = useTaskStore()

  return (
    <div className={styles.card}>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(event) => toggleTask(task.id, event.target.checked)}
        />
        <span className={styles.indicator} aria-hidden="true" />
      </label>

      <div className={styles.content}>
        <div className={styles.row}>
          <input
            className={styles.title}
            value={task.title}
            onChange={(event) => updateTask(task.id, { title: event.target.value })}
          />
          <button
            className={styles.delete}
            type="button"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
        {task.description ? <p className={styles.description}>{task.description}</p> : null}
        {task.dueDate ? <p className={styles.meta}>Due {task.dueDate}</p> : null}
      </div>
    </div>
  )
}

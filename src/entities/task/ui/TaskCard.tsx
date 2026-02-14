import styles from './TaskCard.module.css'
import type { Task } from '../model/types'
import { CompleteCheckbox } from '../../../features/complete-task/ui/CompleteCheckbox'
import { DeleteButton } from '../../../features/delete-task/ui/DeleteButton'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className={styles.card}>
      <CompleteCheckbox taskId={task.id} completed={task.completed}>
        <button className={styles.titleButton}>{task.title}</button>
      </CompleteCheckbox>
      <div className={styles.actions}>
        {task.dueDate ? <p className={styles.meta}>Due {task.dueDate}</p> : <div />}
        <DeleteButton taskId={task.id} />
      </div>
    </div>
  )
}

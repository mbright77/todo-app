import styles from './TaskCard.module.css'
import type { Task } from '../model/types'
import { CompleteCheckbox } from '../../../features/complete-task/ui/CompleteCheckbox'
import { DeleteButton } from '../../../features/delete-task/ui/DeleteButton'
import { EditTaskForm } from '../../../features/edit-task/ui/EditTaskForm'
import { formatDate } from '../../../shared/lib/date'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.leading}>
        <CompleteCheckbox taskId={task.id} completed={task.completed} label={task.title} />
        <EditTaskForm task={task} />
      </div>
      <div className={styles.actions}>
        {task.dueDate ? <p className={styles.meta}>Due {formatDate(task.dueDate)}</p> : null}
        <DeleteButton taskId={task.id} />
      </div>
    </div>
  )
}

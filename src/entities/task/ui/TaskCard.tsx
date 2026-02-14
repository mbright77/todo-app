import styles from './TaskCard.module.css'
import type { Task } from '../model/types'
import { CompleteCheckbox } from '../../../features/complete-task/ui/CompleteCheckbox'
import { DeleteButton } from '../../../features/delete-task/ui/DeleteButton'
import { EditTaskForm } from '../../../features/edit-task/ui/EditTaskForm'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className={styles.card}>
      <CompleteCheckbox taskId={task.id} completed={task.completed} label={task.title} />

      <div className={styles.content}>
        <div className={styles.row}>
          <EditTaskForm task={task} />
          <DeleteButton taskId={task.id} />
        </div>
        {task.dueDate ? <p className={styles.meta}>Due {task.dueDate}</p> : null}
      </div>
    </div>
  )
}

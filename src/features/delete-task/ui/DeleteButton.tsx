import styles from './DeleteButton.module.css'
import { useTaskStore } from '../../../entities/task/model/store'

type DeleteButtonProps = {
  taskId: string
}

export function DeleteButton({ taskId }: DeleteButtonProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask)

  return (
    <button className={styles.button} type="button" onClick={() => deleteTask(taskId)}>
      Delete
    </button>
  )
}

import styles from './CompleteCheckbox.module.css'
import { useTaskStore } from '../../../entities/task/model/store'

type CompleteCheckboxProps = {
  taskId: string
  completed: boolean
  label?: string
}

export function CompleteCheckbox({ taskId, completed, label }: CompleteCheckboxProps) {
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const ariaLabel = label ?? 'task'

  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={completed}
        aria-label={`Mark ${ariaLabel} as completed`}
        onChange={(event) => toggleTask(taskId, event.target.checked)}
      />
      <span className={styles.indicator} aria-hidden="true" />
    </label>
  )
}

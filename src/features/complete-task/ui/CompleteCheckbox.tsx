import styles from './CompleteCheckbox.module.css'
import { useTaskStore } from '../../../entities/task/model/store'
import type { ReactNode } from 'react'

type CompleteCheckboxProps = {
  taskId: string
  completed: boolean
  children: ReactNode
}

export function CompleteCheckbox({ taskId, completed, children }: CompleteCheckboxProps) {
  const toggleTask = useTaskStore((state) => state.toggleTask)

  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={completed}
        onChange={(event) => toggleTask(taskId, event.target.checked)}
      />
      <span className={styles.indicator} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </label>
  )
}

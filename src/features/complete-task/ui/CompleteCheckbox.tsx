import { useTaskStore } from '../../../entities/task/model/store'
import { Checkbox } from '@mui/material'

type CompleteCheckboxProps = {
  taskId: string
  completed: boolean
  label?: string
}

export function CompleteCheckbox({ taskId, completed, label }: CompleteCheckboxProps) {
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const ariaLabel = label ?? 'task'

  return (
    <Checkbox
      checked={completed}
      onChange={(event) => toggleTask(taskId, event.target.checked)}
      inputProps={{ 'aria-label': `Mark ${ariaLabel} as completed` }}
    />
  )
}

import { useState } from 'react'
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
  const [isToggling, setIsToggling] = useState(false)

  const handleChange = async (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (isToggling) return
    setIsToggling(true)
    try {
      await toggleTask(taskId, checked)
    } catch (error) {
      console.error('Failed to toggle task:', error)
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <Checkbox
      checked={completed}
      onChange={handleChange}
      disabled={isToggling}
      inputProps={{ 'aria-label': `Mark ${ariaLabel} as completed` }}
    />
  )
}

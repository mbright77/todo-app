import { useTaskStore } from '../../../entities/task/model/store'
import { IconButton } from '../../../shared/ui/IconButton'
import { TrashIcon } from '../../../shared/ui/TrashIcon'

type DeleteButtonProps = {
  taskId: string
}

export function DeleteButton({ taskId }: DeleteButtonProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask)

  return (
    <IconButton onClick={() => deleteTask(taskId)} aria-label="Delete task">
      <TrashIcon />
    </IconButton>
  )
}

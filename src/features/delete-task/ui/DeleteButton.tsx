import { useTaskStore } from '../../../entities/task/model/store'
import { IconButton } from '../../../shared/ui/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

type DeleteButtonProps = {
  taskId: string
}

export function DeleteButton({ taskId }: DeleteButtonProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask)

  return (
    <IconButton onClick={() => deleteTask(taskId)} aria-label="Delete task">
      <DeleteIcon />
    </IconButton>
  )
}

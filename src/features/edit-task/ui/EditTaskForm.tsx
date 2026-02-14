import { useState } from 'react'
import styles from './EditTaskForm.module.css'
import type { Task } from '../../../entities/task/model/types'
import { useTaskStore } from '../../../entities/task/model/store'

type EditTaskFormProps = {
  task: Task
}

export function EditTaskForm({ task }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? '')
  const [dueDate, setDueDate] = useState(task.dueDate ?? '')
  const updateTask = useTaskStore((state) => state.updateTask)

  const onBlur = async () => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setTitle(task.title)
      setDescription(task.description ?? '')
      setDueDate(task.dueDate ?? '')
      return
    }

    if (
      trimmedTitle !== task.title ||
      description !== (task.description ?? '') ||
      dueDate !== (task.dueDate ?? '')
    ) {
      await updateTask(task.id, {
        title: trimmedTitle,
        description: description.trim() || null,
        dueDate: dueDate.trim() || null,
      })
    }
  }

  return (
    <div className={styles.form}>
      <input
        className={styles.title}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={onBlur}
        placeholder="Task title"
        aria-label="Task title"
      />
      <input
        className={styles.description}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        onBlur={onBlur}
        aria-label="Task description"
        placeholder="Add details"
      />
      <input
        className={styles.date}
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
        onBlur={onBlur}
        aria-label="Task due date"
      />
    </div>
  )
}

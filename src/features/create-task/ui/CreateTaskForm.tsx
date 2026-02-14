import { useState } from 'react'
import styles from './CreateTaskForm.module.css'
import { useTaskStore } from '../../../entities/task/model/store'
import { Button } from '../../../shared/ui/Button'
import { PlusIcon } from '../../../shared/ui/PlusIcon'

export function CreateTaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const createTask = useTaskStore((state) => state.createTask)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim()) return
    await createTask({ title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-title">
          Task title
        </label>
        <input
          id="task-title"
          className={styles.input}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a task"
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-notes">
          Notes
        </label>
        <input
          id="task-notes"
          className={styles.input}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Optional description"
        />
      </div>
      <Button type="submit">
        <PlusIcon />
        Add
      </Button>
    </form>
  )
}

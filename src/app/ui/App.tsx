import { useEffect } from 'react'
import styles from './App.module.css'
import { TaskList } from '../../entities/task/ui/TaskList'
import { CreateTaskForm } from '../../features/create-task/ui/CreateTaskForm'
import { TaskFilters } from '../../features/search-tasks/ui/TaskFilters'
import { useTaskStore } from '../../entities/task/model/store'

export function App() {
  const { seedDemoData, filter } = useTaskStore()

  useEffect(() => {
    seedDemoData()
  }, [seedDemoData])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Today</p>
          <h1 className={styles.title}>My Tasks</h1>
        </div>
        <div className={styles.chip}>{filter.label}</div>
      </header>

      <section className={styles.panel}>
        <CreateTaskForm />
        <TaskFilters />
        <TaskList />
      </section>
    </div>
  )
}

import { CreateTaskForm } from '../../../features/create-task/ui/CreateTaskForm'
import { TaskFilters } from '../../../features/search-tasks/ui/TaskFilters'
import { TaskList } from '../../../entities/task/ui/TaskList'
import { Layout } from '../../../shared/ui/Layout'
import { useTaskStore } from '../../../entities/task/model/store'
import styles from './TodayPage.module.css'

export function TodayPage() {
  const filterLabel = useTaskStore((state) => state.filter.label)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Today</p>
          <h1 className={styles.title}>My Tasks</h1>
        </div>
        <div className={styles.chip}>{filterLabel}</div>
      </header>

      <Layout>
        <section className={styles.panel}>
          <CreateTaskForm />
          <TaskFilters />
          <TaskList />
        </section>
      </Layout>
    </div>
  )
}

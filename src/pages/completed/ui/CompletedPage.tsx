import { TaskList } from '../../../entities/task/ui/TaskList'
import { Layout } from '../../../shared/ui/Layout'
import { TaskNav } from '../../../shared/ui/TaskNav'
import styles from './CompletedPage.module.css'

export function CompletedPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Completed</p>
          <h1 className={styles.title}>Finished Tasks</h1>
        </div>
        <div className={styles.chip}>Done</div>
      </header>

      <div className={styles.navRow}>
        <TaskNav />
      </div>

      <Layout>
        <section className={styles.panel}>
          <TaskList
            filterKey="completed"
            emptyMessage="No completed tasks yet."
          />
        </section>
      </Layout>
    </div>
  )
}

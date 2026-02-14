import { TaskList } from '../../../entities/task/ui/TaskList'
import { Layout } from '../../../shared/ui/Layout'
import { TaskNav } from '../../../shared/ui/TaskNav'
import styles from './UpcomingPage.module.css'

export function UpcomingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Upcoming</p>
          <h1 className={styles.title}>Upcoming Tasks</h1>
        </div>
        <div className={styles.chip}>Soon</div>
      </header>

      <div className={styles.navRow}>
        <TaskNav />
      </div>

      <Layout>
        <section className={styles.panel}>
          <TaskList
            filterKey="upcoming"
            emptyMessage="No upcoming tasks yet."
          />
        </section>
      </Layout>
    </div>
  )
}

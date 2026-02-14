import { Layout } from '../../../shared/ui/Layout'
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

      <Layout>
        <section className={styles.panel}>
          <p className={styles.placeholder}>Upcoming tasks will appear here.</p>
        </section>
      </Layout>
    </div>
  )
}

import { Layout } from '../../../shared/ui/Layout'
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

      <Layout>
        <section className={styles.panel}>
          <p className={styles.placeholder}>Completed tasks will show here.</p>
        </section>
      </Layout>
    </div>
  )
}

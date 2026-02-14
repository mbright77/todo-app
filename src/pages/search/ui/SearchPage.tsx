import { Layout } from '../../../shared/ui/Layout'
import styles from './SearchPage.module.css'

export function SearchPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Search</p>
          <h1 className={styles.title}>Find Tasks</h1>
        </div>
        <div className={styles.chip}>Query</div>
      </header>

      <Layout>
        <section className={styles.panel}>
          <p className={styles.placeholder}>Search results will appear here.</p>
        </section>
      </Layout>
    </div>
  )
}

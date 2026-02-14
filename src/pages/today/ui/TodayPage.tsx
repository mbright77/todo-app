import styles from './TodayPage.module.css'

export function TodayPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Today</h1>
      <p className={styles.placeholder}>Today's tasks will appear here.</p>
    </div>
  )
}

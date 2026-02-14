import { useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Layout } from '../../../shared/ui/Layout'
import { Input } from '../../../shared/ui/Input'
import { TaskCard } from '../../../entities/task/ui/TaskCard'
import { taskDb } from '../../../entities/task/api/task.db'
import { TaskNav } from '../../../shared/ui/TaskNav'
import styles from './SearchPage.module.css'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const trimmedQuery = query.trim()
  const results = useLiveQuery(() => taskDb.searchByTitle(trimmedQuery), [trimmedQuery])
  const totalLabel = useMemo(() => {
    if (!results) return 'Searching'
    if (!trimmedQuery) return 'Type to search'
    if (results.length === 0) return 'No matches'
    return `${results.length} match${results.length === 1 ? '' : 'es'}`
  }, [results, trimmedQuery])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Search</p>
          <h1 className={styles.title}>Find Tasks</h1>
        </div>
        <div className={styles.chip}>{totalLabel}</div>
      </header>

      <div className={styles.navRow}>
        <TaskNav />
      </div>

      <Layout>
        <section className={styles.panel}>
          <div className={styles.searchRow}>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tasks by title"
              aria-label="Search tasks"
              className={styles.searchInput}
            />
            {trimmedQuery ? (
              <button className={styles.clearButton} onClick={() => setQuery('')}>
                Clear
              </button>
            ) : null}
          </div>
          {!trimmedQuery ? (
            <p className={styles.placeholder}>Start typing to search your tasks.</p>
          ) : results && results.length === 0 ? (
            <p className={styles.placeholder}>No tasks match that search.</p>
          ) : results ? (
            <div className={styles.results}>
              {results.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <p className={styles.placeholder}>Searching tasks...</p>
          )}
        </section>
      </Layout>
    </div>
  )
}

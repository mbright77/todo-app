import { useState } from 'react'
import { CreateTaskForm } from '../../../features/create-task/ui/CreateTaskForm'
import { TaskList } from '../../../entities/task/ui/TaskList'
import { Layout } from '../../../shared/ui/Layout'
import { IconButton } from '../../../shared/ui/IconButton'
import { FilterIcon } from '../../../shared/ui/FilterIcon'
import { TaskFilters } from '../../../features/search-tasks/ui/TaskFilters'
import styles from './TodayPage.module.css'

export function TodayPage() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Your Tasks</p>
          <h1 className={styles.title}>Today</h1>
        </div>
        <IconButton onClick={() => setIsFilterModalOpen(true)}>
          <FilterIcon />
        </IconButton>
      </header>

      {isFilterModalOpen && <TaskFilters onClose={() => setIsFilterModalOpen(false)} />}

      <Layout>
        <section className={styles.panel}>
          <CreateTaskForm />
          <TaskList />
        </section>
      </Layout>
    </div>
  )
}

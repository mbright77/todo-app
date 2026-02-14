import type { PropsWithChildren } from 'react'
import { Component } from 'react'
import { Button } from './Button'
import styles from './ErrorBoundary.module.css'

type ErrorBoundaryState = {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: '',
  }

  static getDerivedStateFromError(error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected error'
    return { hasError: true, message }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <main className={styles.page}>
        <section className={styles.panel} role="alert">
          <p className={styles.kicker}>Something went wrong</p>
          <h1 className={styles.title}>We hit a snag.</h1>
          <p className={styles.body}>
            Your tasks are safe on this device. Reload the app to try again.
          </p>
          <p className={styles.detail}>{this.state.message}</p>
          <div className={styles.actions}>
            <Button onClick={this.handleReload}>Reload app</Button>
          </div>
        </section>
      </main>
    )
  }
}

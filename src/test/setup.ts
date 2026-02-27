import '@testing-library/jest-dom'
import 'fake-indexeddb/auto'
import { beforeEach, vi } from 'vitest'
import { db } from '../shared/lib/db'

// Reset the IndexedDB tasks table before every test to prevent state leakage
// across test files that share the same fake-indexeddb instance.
// Restore real timers first so the async IDB call is never blocked by fake timers
// left over from a previous test.
beforeEach(async () => {
  vi.useRealTimers()
  await db.tasks.clear()
})

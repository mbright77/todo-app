# Architecture

## Overview

A local-only, offline-first task list built as a Progressive Web App.
Single user, single device. No accounts, no server, no cloud sync, no telemetry.

---

## Technology Choices

| Concern            | Choice                  | Rationale                                                        |
| ------------------ | ----------------------- | ---------------------------------------------------------------- |
| Language           | TypeScript 5+           | Type safety across the entire codebase                           |
| UI framework       | React 19+               | Component model, ecosystem, PWA compatibility                    |
| Build tool         | Vite                    | Fast HMR, native ESM, first-class TS/React support              |
| State management   | Zustand                 | Minimal boilerplate, works well with sliced stores per feature   |
| Local storage      | IndexedDB via Dexie.js  | Async, indexed, structured storage with a clean query API        |
| Reactivity (DB)    | dexie-react-hooks       | `useLiveQuery` keeps UI in sync with IndexedDB automatically     |
| PWA tooling        | vite-plugin-pwa         | Service worker generation, caching strategies, manifest          |
| Styling            | MUI v7 (Material UI)    | Component-based styling, MD3 aesthetic, built-in accessibility. See [UI Design Guide](./DESIGN_GUIDE.md) |
| Icons              | MUI Icons (Material)    | Standardized Material Design icon set, bundled for offline use. |
| Fonts              | @fontsource/roboto      | Bundled Roboto font for self-hosted, offline-first typography. |
| Transitions        | react-transition-group  | Used with MUI components for fluid list animations. |
| Testing            | Vitest + Testing Library| Vite-native test runner, component and integration tests         |
| Linting            | ESLint + Prettier       | Consistent code style                                            |

---

## Feature Sliced Design

The codebase follows **Feature Sliced Design (FSD)** -- an architectural methodology
that organises code by business domain rather than technical role.

### Layers (top to bottom)

| Layer        | Purpose                                                      | Import rule                |
| ------------ | ------------------------------------------------------------ | -------------------------- |
| `app`        | Application bootstrap, providers, global styles, router      | Can import all layers      |
| `pages`      | Route-level components that compose features and entities     | Cannot import other pages  |
| `features`   | User interactions that deliver business value (create, edit)  | Cannot import pages        |
| `entities`   | Business domain objects and their data access (Task)          | Cannot import features     |
| `shared`     | Reusable utilities, UI kit, constants, types, hooks           | Cannot import upper layers |

### Slices & Segments

Within each layer, code is grouped into **slices** (domain areas) and **segments**:

- `ui/`    -- React components
- `model/` -- Zustand store slices, types, selectors
- `api/`   -- Data access (Dexie queries)
- `lib/`   -- Helpers and utilities

---

## Folder Structure

```
src/
├── app/                          # Application shell
│   ├── lib/
│   │   └── sw.ts                 #   Service worker registration + update wiring
│   ├── model/
│   │   └── swUpdate.ts           #   Zustand slice for SW update notification state
│   ├── ui/
│   │   ├── AppLayout.tsx         #   Root layout: AppBar, nav, FAB, update snackbar
│   │   ├── TaskNav.tsx           #   Tab navigation (app-specific routes)
│   │   └── SwUpdateSnackbar.tsx  #   Non-blocking "update available" snackbar
│   ├── router.tsx                #   Route definitions
│   ├── theme.ts                  #   MUI theme (MD3 tokens, dark mode)
│   └── global.css                #   CSS reset, design tokens
│
├── pages/                        # Route-level pages
│   ├── active/ui/ActivePage.tsx
│   ├── upcoming/ui/UpcomingPage.tsx
│   ├── completed/ui/CompletedPage.tsx
│   └── search/ui/SearchPage.tsx
│
├── features/                     # User-facing interactions
│   ├── create-task/
│   │   └── ui/
│   │       ├── CreateTaskForm.tsx  #   Inline create form (disclosure panel)
│   │       └── CreateTaskFab.tsx   #   FAB + dialog wrapper with safe-area insets
│   ├── edit-task/
│   │   └── ui/
│   │       └── EditTaskForm.tsx    #   Debounced blur-save inline editor
│   ├── complete-task/
│   │   └── ui/
│   │       └── CompleteCheckbox.tsx
│   ├── delete-task/
│   │   └── ui/
│   │       └── DeleteButton.tsx    #   Delete with 5 s undo snackbar + focus restore
│   ├── filter-tasks/
│   │   └── ui/
│   │       └── FilterTasksDialog.tsx  #   Filter picker dialog
│   ├── reorder-tasks/
│   │   └── ui/
│   │       └── ReorderableTaskList.tsx
│   ├── search-tasks/
│   │   └── ui/
│   │       └── SearchBar.tsx
│   └── switch-theme/
│       └── ui/
│           └── ThemeToggle.tsx     #   Theme menu with full ARIA (menuitemradio)
│
├── entities/                     # Domain objects
│   └── task/
│       ├── ui/
│       │   ├── TaskCard.tsx
│       │   └── TaskList.tsx
│       ├── model/
│       │   ├── types.ts          #   Task, TaskFilter, TaskFilterKey
│       │   ├── store.ts          #   Zustand store (filter, CRUD, reorder actions)
│       │   ├── task.factory.ts   #   buildTask() factory
│       │   └── order.ts          #   buildOrderUpdates() helper
│       └── api/
│           └── task.db.ts        #   Dexie queries; createWithMinOrder transaction
│
├── shared/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx        #   forwardRef wrapper around MUI IconButton
│   │   ├── Modal.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── sx.ts                 #   Shared MUI sx constants (VISUALLY_HIDDEN_SX)
│   ├── lib/
│   │   ├── db.ts                 #   Dexie database instance + TaskRecord type
│   │   ├── date.ts               #   IsoDateString branded type, toIsoDateTime,
│   │   │                         #   toDateKey, normalizeDateKey, isToday, formatDate
│   │   └── id.ts                 #   ID generation (crypto.randomUUID)
│   └── config/
│       └── constants.ts          #   APP_NAME, TASK_FILTERS, FILTER_DIALOG_KEYS
│
└── test/
    └── setup.ts                  # Global test setup: jest-dom, fake-indexeddb,
                                  # beforeEach IDB reset + real-timer restore
```

---

## Data Model

All data lives in a single IndexedDB database managed by Dexie.js.

### Task

| Field        | Type                  | Indexed | Description                          |
| ------------ | --------------------- | ------- | ------------------------------------ |
| `id`         | `string` (UUID)       | PK      | Primary key, generated client-side   |
| `title`      | `string`              | Yes     | Task title, required                 |
| `description`| `string \| null`      | No      | Optional longer description          |
| `completed`  | `boolean`             | Yes     | Whether the task is done             |
| `dueDate`    | `string \| null`      | Yes     | ISO-8601 date string, nullable       |
| `order`      | `number`              | Yes     | Global sort key (lower shows first)  |
| `createdAt`  | `string`              | Yes     | ISO-8601 timestamp, set on creation  |
| `updatedAt`  | `string`              | No      | ISO-8601 timestamp, set on mutation  |

#### Dexie Schema

```typescript
// shared/lib/db.ts
import Dexie, { type Table } from 'dexie'

export type TaskRecord = {
  id: string
  title: string
  description: string | null
  completed: boolean
  dueDate: string | null
  order?: number          // undefined on v1 records before migration
  createdAt: string
  updatedAt: string
}

class TodoDatabase extends Dexie {
  tasks!: Table<TaskRecord, string>

  constructor() {
    super('todo-app')
    this.version(1).stores({ tasks: 'id, title, completed, dueDate, createdAt' })
    this.version(2)
      .stores({ tasks: 'id, order, title, completed, dueDate, createdAt' })
      .upgrade(async (tx) => {
        // backfill order for existing tasks using createdAt order
        const tasks = await tx.table('tasks').orderBy('createdAt').reverse().toArray()
        await Promise.all(
          tasks.map((task, index) =>
            tx.table('tasks').update(task.id, { order: task.order ?? index })
          )
        )
      })
  }
}

export const db = new TodoDatabase()
```

### Index Rationale

- **`completed`** -- partition tasks into active vs. completed lists.
- **`dueDate`** -- sort and filter for Active / Upcoming views.
- **`order`** -- global user-defined ordering shared across views.
- **`createdAt`** -- tie-breaker within the same order.
- **`title`** -- enables fast prefix search via `where("title").startsWithIgnoreCase(...)`.

---

## Data Flow

```
┌──────────────┐       ┌──────────────┐       ┌──────────────────┐
│  React UI    │──────▶│  Zustand     │──────▶│  Dexie.js        │
│  (components)│◀──────│  (store)     │◀──────│  (IndexedDB)     │
└──────────────┘       └──────────────┘       └──────────────────┘
     re-render            selectors             useLiveQuery
```

1. **Write path** -- Component calls a Zustand action -> action writes to Dexie -> `useLiveQuery` detects the change -> React re-renders.
2. **Read path** -- Components use `useLiveQuery` hooks (from `dexie-react-hooks`) that subscribe to IndexedDB and return reactive data directly. Zustand holds only transient UI state (search query, active filter).

This means Dexie is the **source of truth**. Zustand is used for ephemeral UI state only (e.g., current search term, which list tab is active).

---

## Behavior Notes

- **Active list:** tasks that are not completed and either have no due date or are due today.
- **Upcoming list:** tasks with `dueDate` after today and `completed === false`.
- **Completed list:** tasks with `completed === true`.
- **Search:** case-insensitive match on `title` substring; empty query returns no results.
- **Due dates:** stored as `YYYY-MM-DD` (from date inputs) and normalized before comparisons.
- **Ordering:** tasks are sorted by `order` ascending across all views. New tasks default to the top.
- **Reorder gesture:** drag cards to reorder; on touch devices drag activates after ~500ms press-and-hold.

## PWA Update Behavior

When a new service worker is available the app surfaces a non-blocking snackbar ("A new version is available / Reload") rather than silently reloading.

- `app/lib/sw.ts` — calls `registerSW` and on `onNeedRefresh` signals `useSwUpdateStore`.
- `app/model/swUpdate.ts` — Zustand slice holding `updateAvailable` + the `applyUpdate` callback.
- `app/ui/SwUpdateSnackbar.tsx` — renders the snackbar; user must click Reload to apply the update.
- Service worker uses `skipWaiting` and `clientsClaim`, so once the user reloads the new version activates immediately.

## Key Constraints

- **No network requests.** No fetch, no XMLHttpRequest, no WebSocket.
- **No remote dependencies at runtime.** All assets are bundled and served from the service worker cache.
- **No telemetry or analytics.** Zero data leaves the device.
- **Single user.** No auth, no user model, no multi-tenancy.
- **PWA installable.** Must pass Lighthouse PWA audit: manifest, service worker, offline support, icons.

# Roadmap

Development is split into four sequential phases. Each phase produces a
working, testable increment of the application.

---

## Phase 1 -- Foundation

**Goal:** Project scaffolding, database layer, shared UI primitives, PWA shell.

**Status:** In progress. Most deliverables are complete; remaining item is router wiring for placeholder pages.

| #   | Deliverable                                    | Details                                                         |
| --- | ---------------------------------------------- | --------------------------------------------------------------- |
| 1.1 | Vite + React + TypeScript scaffold             | `npm create vite@latest`, strict TS config, ESLint, Prettier    |
| 1.2 | FSD folder structure                           | Create `app/`, `pages/`, `features/`, `entities/`, `shared/`    |
| 1.3 | Dexie database instance                        | `shared/lib/db.ts` with `tasks` table, version 1 schema         |
| 1.4 | Task entity types                              | `entities/task/model/types.ts` -- `Task` interface               |
| 1.5 | Shared UI kit                                  | Button, Input, IconButton, Layout components with CSS Modules    |
| 1.6 | App shell & router                             | React Router with placeholder pages for Today, Upcoming, etc.   |
| 1.7 | PWA manifest + icons                           | `vite-plugin-pwa` config, manifest.json, app icons               |
| 1.8 | Global styles & design tokens                  | CSS reset, colour palette, spacing scale, typography             |

**Exit criteria:** App runs in dev, installs as a PWA, shows placeholder pages, DB is initialised on first visit.

### Current state (session handoff)

- Vite React TS scaffold is in place with ESLint and TS configs.
- PWA configured in `vite.config.ts` using `vite-plugin-pwa@1.2.0`.
- Feature Sliced folder structure created under `src/`.
- IndexedDB set up with Dexie (`src/shared/lib/db.ts`) and Task model (`src/entities/task/model/types.ts`).
- Basic CRUD UI wired: create form, task list, inline edit, toggle complete, delete.
- Filter chips (`all`, `active`, `completed`) with Zustand store (`src/entities/task/model/store.ts`).
- Placeholder page components exist in `src/pages/*/ui/*.tsx` but are not routed.

#### Issues to resume

- No router is wired yet (Phase 1 item 1.6). Add React Router and routes for Today/Upcoming/Completed/Search.
- PWA icons are SVG-only; PNG icons are not generated. Decide whether to keep SVG or generate PNG assets.
- `npm run dev` works; dev server uses port 5174 if 5173 is busy.

---

## Phase 2 -- Core Task CRUD

**Goal:** Users can create, view, edit, complete, and delete tasks.

| #   | Deliverable                                    | Details                                                         |
| --- | ---------------------------------------------- | --------------------------------------------------------------- |
| 2.1 | Task data access layer                         | `entities/task/api/task.db.ts` -- add, get, update, remove      |
| 2.2 | TaskCard component                             | `entities/task/ui/TaskCard.tsx` -- displays one task             |
| 2.3 | TaskList component                             | `entities/task/ui/TaskList.tsx` -- renders a list of TaskCards   |
| 2.4 | Create task feature                            | `features/create-task/` -- form + Dexie insert                   |
| 2.5 | Edit task feature                              | `features/edit-task/` -- inline or modal edit + Dexie update      |
| 2.6 | Complete task feature                          | `features/complete-task/` -- checkbox toggle + Dexie update       |
| 2.7 | Delete task feature                            | `features/delete-task/` -- delete action + Dexie remove           |
| 2.8 | Zustand UI state store                         | `entities/task/model/store.ts` -- active filter, transient state  |
| 2.9 | Unit & integration tests                       | Vitest tests for DB layer, store actions, and components          |

**Exit criteria:** Full CRUD lifecycle works. Tasks persist across page reloads via IndexedDB.

---

## Phase 3 -- Task Lists & Search

**Goal:** Users can view tasks grouped by Today / Upcoming / Completed, and search by title.

| #   | Deliverable                                    | Details                                                         |
| --- | ---------------------------------------------- | --------------------------------------------------------------- |
| 3.1 | Today page                                     | `pages/today/` -- tasks where `dueDate` is today                 |
| 3.2 | Upcoming page                                  | `pages/upcoming/` -- tasks where `dueDate` is in the future      |
| 3.3 | Completed page                                 | `pages/completed/` -- tasks where `completed === true`            |
| 3.4 | Tab navigation                                 | Tab bar or sidebar to switch between Today, Upcoming, Completed  |
| 3.5 | Search feature                                 | `features/search-tasks/` -- SearchBar + live query by title       |
| 3.6 | Search results page                            | `pages/search/` -- displays filtered results                      |
| 3.7 | Empty states                                   | Friendly empty state UI for each list and search                  |
| 3.8 | Tests for list views & search                  | Query correctness for each filter, edge cases (no results, etc.)  |

**Exit criteria:** All three list views render correctly. Search filters tasks by title in real time.

---

## Phase 4 -- Polish & PWA Hardening

**Goal:** Production-quality PWA that is installable, fully offline, accessible, and responsive.

| #   | Deliverable                                    | Details                                                         |
| --- | ---------------------------------------------- | --------------------------------------------------------------- |
| 4.1 | Service worker caching                         | Precache app shell, runtime cache for assets via Workbox          |
| 4.2 | Offline support                                | App works entirely without network after first load               |
| 4.3 | Responsive layout                              | Mobile-first, adapts to tablet and desktop viewports              |
| 4.4 | Accessibility audit                            | Keyboard navigation, ARIA labels, focus management, contrast      |
| 4.5 | Animations & transitions                       | Subtle transitions for task completion, list changes, search      |
| 4.6 | Error boundaries                               | Graceful error handling with user-friendly fallback UI            |
| 4.7 | Lighthouse audit                               | Pass PWA, Performance, Accessibility, and Best Practices audits   |
| 4.8 | Production build & deployment config           | Optimised Vite build, static hosting config (e.g. Netlify/Vercel) |

**Exit criteria:** Lighthouse PWA score is green. App installs on mobile and desktop, works offline, and meets WCAG 2.1 AA.

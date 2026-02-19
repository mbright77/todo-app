# Roadmap

Development is split into four sequential phases. Each phase produces a
working, testable increment of the application.

---

## Phase 1 -- Foundation

**Goal:** Project scaffolding, database layer, shared UI primitives, PWA shell.

**Rules:** No automatic git commits or pushes are allowed unles explicitly asked for by the user. Each single commit must be asked for. All UI development should follow the [UI Design Guide](./DESIGN_GUIDE.md). 

**Status:** Complete. Phase 1 deliverables are finished and verified.

| #   | Deliverable                                    | Details                                                         |
| --- | ---------------------------------------------- | --------------------------------------------------------------- |
| 1.1 | Vite + React + TypeScript scaffold             | `npm create vite@latest`, strict TS config, ESLint, Prettier    |
| 1.2 | FSD folder structure                           | Create `app/`, `pages/`, `features/`, `entities/`, `shared/`    |
| 1.3 | Dexie database instance                        | `shared/lib/db.ts` with `tasks` table, version 1 schema         |
| 1.4 | Task entity types                              | `entities/task/model/types.ts` -- `Task` interface               |
| 1.5 | Shared UI kit                                  | Button, Input, IconButton, Layout components with CSS Modules    |
| 1.6 | App shell & router                             | React Router with placeholder pages for Active, Upcoming, etc.  |
| 1.7 | PWA manifest + icons                           | `vite-plugin-pwa` config, manifest.json, app icons               |
| 1.8 | Global styles & design tokens                  | CSS reset, colour palette, spacing scale, typography             |

**Exit criteria:** App runs in dev, installs as a PWA, shows placeholder pages, DB is initialised on first visit.

### Current state (session handoff)

- Vite React TS scaffold is in place with ESLint and TS configs.
- PWA configured in `vite.config.ts` using `vite-plugin-pwa@1.2.0`.
- Feature Sliced folder structure created under `src/`.
- IndexedDB set up with Dexie (`src/shared/lib/db.ts`) and Task model (`src/entities/task/model/types.ts`).
- App router is wired with placeholder pages for Active/Upcoming/Completed/Search.
- Global styles and shared UI primitives are in place.

#### Notes

- PWA icons remain SVG-only; PNG assets can be added later if required by distribution targets.

---

## Phase 2 -- Core Task CRUD

**Goal:** Users can create, view, edit, complete, and delete tasks.

**Status:** Complete. Phase 2 deliverables are finished and verified.

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
| 2.10 | Active page wiring                            | Render CRUD UI on `pages/active/`                                  |

**Exit criteria:** Full CRUD lifecycle works. Tasks persist across page reloads via IndexedDB.

---

## Phase 3 -- Task Lists & Search

**Goal:** Users can view tasks grouped by Active / Upcoming / Completed, and search by title.

**Status:** Complete. Phase 3 deliverables are finished and verified.

| #   | Deliverable                                    | Details                                                         |
| --- | ---------------------------------------------- | --------------------------------------------------------------- |
| 3.1 | Active page                                    | `pages/active/` -- tasks without due dates or due today            |
| 3.2 | Upcoming page                                  | `pages/upcoming/` -- tasks where `dueDate` is in the future      |
| 3.3 | Completed page                                 | `pages/completed/` -- tasks where `completed === true`            |
| 3.4 | Tab navigation                                 | Tab bar or sidebar to switch between Active, Upcoming, Completed |
| 3.5 | Search feature                                 | `features/search-tasks/` -- SearchBar + live query by title       |
| 3.6 | Search results page                            | `pages/search/` -- displays filtered results                      |
| 3.7 | Empty states                                   | Friendly empty state UI for each list and search                  |
| 3.8 | Tests for list views & search                  | Query correctness for each filter, edge cases (no results, etc.)  |

**Exit criteria:** All three list views render correctly. Search filters tasks by title in real time.

---

## Phase 4 -- Polish & PWA Hardening

**Goal:** Production-quality PWA that is installable, fully offline, accessible, and responsive.

**Status:** Complete. Phase 4 deliverables are finished and verified.

| #   | Deliverable                                    | Details                                                         |
| --- | ---------------------------------------------- | --------------------------------------------------------------- |
| 4.1 | Service worker caching                         | Precache app shell, runtime cache for assets via Workbox          |
| 4.2 | Offline support                                | App works entirely without network after first load               |
| 4.3 | Responsive layout                              | Mobile-first, adapts to tablet and desktop viewports              |
| 4.4 | Accessibility audit                            | Keyboard navigation, ARIA labels, focus management, contrast      |
| 4.5 | Animations & transitions                       | Subtle transitions for task completion, list changes, search      |
| 4.6 | Error boundaries                               | Graceful error handling with user-friendly fallback UI            |
| 4.7 | Lighthouse audit                               | Verified production build and PWA manifest configuration          |
| 4.8 | Production build & deployment config           | Optimised Vite build, GitHub Pages deployment workflow ready      |

**Exit criteria:** App installs on mobile and desktop, works offline, and meets WCAG 2.1 AA.

---

## Phase 5 -- Task Ordering

**Goal:** Users can reorder tasks via drag-and-drop with a global order shared across all tabs.

**Status:** In progress.

| #   | Deliverable                                    | Details                                                                 |
| --- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| 5.1 | Task ordering model                            | Add `order` field to Task and default new tasks to top                  |
| 5.2 | IndexedDB migration                            | Dexie schema bump with `order` index + backfill ordering for existing   |
| 5.3 | Ordered task queries                           | Apply `order` sorting across list filters and search                    |
| 5.4 | Drag-and-drop interactions                     | TaskList supports pointer + long-press drag with pop-out styling        |
| 5.5 | Global ordering                                | Reorder updates persist across Active/Upcoming/Completed/Search         |
| 5.6 | Reindex safeguard                              | Reindex order values when gaps become too small                         |
| 5.7 | Tests                                          | Coverage for order migration, sorting, and reordering behavior          |

**Exit criteria:** Tasks can be reordered by drag-and-drop on desktop and mobile. Order persists globally across all views.

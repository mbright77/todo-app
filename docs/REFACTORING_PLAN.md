# Refactoring Plan

## Step 1 -- Collapsible "Create Task" Panel

**Goal:** Replace the always-visible `CreateTaskForm` with a disclosure (show/hide) pattern that starts collapsed.

**Rationale:** The form consumes significant vertical space and is not always needed. The disclosure pattern (over a modal) is recommended for WCAG 2.1 AA compliance because it avoids keyboard trap risks (SC 2.1.2), works naturally with focus order (SC 2.4.3), reflows cleanly at 320px (SC 1.4.10), and is better on mobile with virtual keyboards.

**Scope:** 3 files modified, 0 new files.

| #   | Task                                          | File(s)                                              | Done |
| --- | --------------------------------------------- | ---------------------------------------------------- | ---- |
| 1.1 | Add disclosure toggle button with `aria-expanded` and `aria-controls` | `src/features/create-task/ui/CreateTaskForm.tsx`     | [ ]  |
| 1.2 | Hide the form by default; show on toggle      | `src/features/create-task/ui/CreateTaskForm.tsx`     | [ ]  |
| 1.3 | On expand, move focus to the `#task-title` input | `src/features/create-task/ui/CreateTaskForm.tsx`     | [ ]  |
| 1.4 | On submit or cancel, collapse and return focus to the toggle button | `src/features/create-task/ui/CreateTaskForm.tsx`     | [ ]  |
| 1.5 | Style the toggle button (pill shape with PlusIcon) and add expand/collapse animation respecting `prefers-reduced-motion` | `src/features/create-task/ui/CreateTaskForm.module.css` | [ ]  |
| 1.6 | Verify `TodayPage` renders the collapsed form correctly with no layout issues | `src/pages/today/ui/TodayPage.tsx`                   | [ ]  |

### Accessibility Checklist (Step 1)

- [ ] `aria-expanded="true|false"` toggles on the trigger button
- [ ] `aria-controls` points to the form container's `id`
- [ ] On expand: focus moves to `#task-title`
- [ ] On collapse: focus returns to the trigger button
- [ ] All inputs retain associated `<label>` elements (SC 3.3.2)
- [ ] Animation respects `prefers-reduced-motion` (already in `global.css`)

---

## Step 2 -- Material Design 3 Migration (MUI v7)

**Goal:** Replace all custom CSS Module styling with MUI v7 components themed to approximate Material Design 3.

**Approach:** Incremental bottom-up migration. MUI and CSS Modules coexist, so each phase produces a working app.

**Library:** MUI v7 with a custom MD3-approximated theme (MD3 color tokens, typography scale, rounded shape). True MD3 components adopted as MUI ships them.

**Offline/PWA:** Fully preserved. Roboto bundled via `@fontsource`, icons via `@mui/icons-material`. Zero CDN access at runtime.

---

### Phase 2A -- Foundation Setup

| #    | Task                                          | File(s)                                              | Done |
| ---- | --------------------------------------------- | ---------------------------------------------------- | ---- |
| 2A.1 | Install dependencies: `@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`, `@fontsource/roboto` | `package.json`                                       | [ ]  |
| 2A.2 | Create MD3 theme with color tokens (Primary `#6750A4`, Secondary `#625B71`), `borderRadius: 12`, MD3 type scale, light/dark color schemes | `src/app/theme.ts` (new)                             | [ ]  |
| 2A.3 | Wrap app in `<ThemeProvider>` + `<CssBaseline />`  | `src/main.tsx`                                       | [ ]  |
| 2A.4 | Import Roboto font (weights 300, 400, 500, 700) via `@fontsource` | `src/main.tsx`                                       | [ ]  |
| 2A.5 | Clean up `global.css`: remove `--font-display`, `--font-sans` vars and color tokens now provided by theme; keep `prefers-reduced-motion` and `box-sizing` | `src/app/global.css`                                 | [ ]  |
| 2A.6 | Verify Vite tree-shaking with MUI named imports | `vite.config.ts`                                     | [ ]  |

---

### Phase 2B -- Shared UI Kit Replacement (Leaf Components)

Replace custom shared components with MUI equivalents. Delete CSS Module files as each is migrated.

| #    | Current Component              | MUI Replacement                                      | Files Modified          | Files Deleted              | Done |
| ---- | ------------------------------ | ---------------------------------------------------- | ----------------------- | -------------------------- | ---- |
| 2B.1 | `shared/ui/Button.tsx`         | MUI `<Button>` (variant="contained", pill via theme) | `Button.tsx`            | `Button.module.css`        | [ ]  |
| 2B.2 | `shared/ui/Input.tsx`          | MUI `<TextField>` (variant="outlined")               | `Input.tsx`             | `Input.module.css`         | [ ]  |
| 2B.3 | `shared/ui/IconButton.tsx`     | MUI `<IconButton>`                                   | `IconButton.tsx`        | `IconButton.module.css`    | [ ]  |
| 2B.4 | `shared/ui/PlusIcon.tsx`, `TrashIcon.tsx`, `FilterIcon.tsx` | `@mui/icons-material`: `Add`, `Delete`, `FilterList` | Consumers of icons      | All 3 icon `.tsx` files    | [ ]  |
| 2B.5 | `shared/ui/Modal.tsx`          | MUI `<Dialog>` with focus trap and `aria-modal`      | `Modal.tsx`             | `Modal.module.css`         | [ ]  |
| 2B.6 | `shared/ui/Layout.tsx`         | MUI `<Container maxWidth="md">`                      | `Layout.tsx`            | `Layout.module.css`        | [ ]  |
| 2B.7 | `shared/ui/ErrorBoundary.tsx`  | Keep class component; replace markup with MUI `<Card>`, `<Typography>`, `<Button>` | `ErrorBoundary.tsx`     | `ErrorBoundary.module.css` | [ ]  |

---

### Phase 2C -- Navigation & App Shell

| #    | Task                                          | File(s)                                              | Done |
| ---- | --------------------------------------------- | ---------------------------------------------------- | ---- |
| 2C.1 | Replace `TaskNav` with MUI `<Tabs>` + `<Tab>` integrated with React Router `NavLink` | `shared/ui/TaskNav.tsx`; delete `TaskNav.module.css` | [ ]  |
| 2C.2 | Add MUI `<AppBar>` + `<Toolbar>` for the page title and filter button | `src/app/ui/AppLayout.tsx` (new)                     | [ ]  |
| 2C.3 | Create shared `AppLayout` component wrapping AppBar + Tabs + Container; update router to use layout route | `src/app/ui/AppLayout.tsx`, `src/app/router.tsx`     | [ ]  |
| 2C.4 | Remove duplicated `.page`, `.header`, `.kicker`, `.title`, `.chip` styles from all 4 page CSS modules | All page `.module.css` files                         | [ ]  |

---

### Phase 2D -- Feature Components

| #    | Current Component       | MUI Migration                                        | Files Modified                | Files Deleted                   | Done |
| ---- | ----------------------- | ---------------------------------------------------- | ----------------------------- | ------------------------------- | ---- |
| 2D.1 | `CreateTaskForm`        | Replace `<input>` with `<TextField>`, `<Button>` with MUI `<Button>`. Disclosure pattern from Step 1 stays intact. | `CreateTaskForm.tsx`          | `CreateTaskForm.module.css`     | [ ]  |
| 2D.2 | `EditTaskForm`          | Replace inline inputs with MUI `<TextField variant="standard">` | `EditTaskForm.tsx`            | `EditTaskForm.module.css`       | [ ]  |
| 2D.3 | `CompleteCheckbox`      | Replace custom checkbox with MUI `<Checkbox>`        | `CompleteCheckbox.tsx`        | `CompleteCheckbox.module.css`   | [ ]  |
| 2D.4 | `DeleteButton`          | Update icon import (already migrated in 2B)          | `DeleteButton.tsx`            | --                              | [ ]  |
| 2D.5 | `TaskFilters`           | Replace with MUI `<Dialog>` + `<List>` + `<ListItemButton>` | `TaskFilters.tsx`             | `TaskFilters.module.css`        | [ ]  |

---

### Phase 2E -- Entity & Page Components

| #    | Task                    | MUI Migration                                        | Files Modified                | Files Deleted                   | Done |
| ---- | ----------------------- | ---------------------------------------------------- | ----------------------------- | ------------------------------- | ---- |
| 2E.1 | `TaskCard`              | Replace with MUI `<Card>` + `<CardContent>` + `<CardActions>` | `TaskCard.tsx`                | `TaskCard.module.css`           | [ ]  |
| 2E.2 | `TaskList`              | Replace with MUI `<Stack spacing={1}>` or `<List>`  | `TaskList.tsx`                | `TaskList.module.css`           | [ ]  |
| 2E.3 | `TodayPage`             | Strip page styles; panel becomes `<Paper>` or `<Card>` | `TodayPage.tsx`               | `TodayPage.module.css`          | [ ]  |
| 2E.4 | `UpcomingPage`          | Same treatment as TodayPage                          | `UpcomingPage.tsx`            | `UpcomingPage.module.css`       | [ ]  |
| 2E.5 | `CompletedPage`         | Same treatment as TodayPage                          | `CompletedPage.tsx`           | `CompletedPage.module.css`      | [ ]  |
| 2E.6 | `SearchPage`            | Replace search input with MUI `<TextField>` + `<InputAdornment>`; replace clear button with MUI `<Button>` | `SearchPage.tsx`              | `SearchPage.module.css`         | [ ]  |

---

### Phase 2F -- Polish & MD3 Finishing Touches

| #    | Task                                          | File(s)                                              | Done |
| ---- | --------------------------------------------- | ---------------------------------------------------- | ---- |
| 2F.1 | Add MUI `<Fab>` (Floating Action Button) with `<AddIcon>` as alternative "create task" trigger | Page components or `AppLayout.tsx`                   | [ ]  |
| 2F.2 | Override MUI elevation with MD3 tonal elevation (surface tint) via theme `components.MuiPaper.styleOverrides` | `src/app/theme.ts`                                   | [ ]  |
| 2F.3 | Add MUI `<Collapse>`, `<Fade>`, `<Grow>` transitions for task creation, completion, deletion | Feature and entity components                        | [ ]  |
| 2F.4 | Add dark mode toggle in AppBar using `useColorScheme()` | `src/app/ui/AppLayout.tsx`                           | [ ]  |
| 2F.5 | Delete all remaining `.module.css` files; remove any leftover custom CSS vars from `global.css` | All remaining CSS module files                       | [ ]  |
| 2F.6 | Update `DESIGN_GUIDE.md` to reference MUI theme tokens instead of hardcoded CSS values | `docs/DESIGN_GUIDE.md`                               | [ ]  |
| 2F.7 | Run accessibility audit: verify focus management in Dialog (TaskFilters) and disclosure (CreateTaskForm) | --                                                   | [ ]  |
| 2F.8 | Run Lighthouse audit: verify PWA, Performance, Accessibility scores are green | --                                                   | [ ]  |

---

## Files Summary

### New Files (2)

| File                       | Purpose                                        |
| -------------------------- | ---------------------------------------------- |
| `src/app/theme.ts`         | MUI theme with MD3 color tokens, typography, shape |
| `src/app/ui/AppLayout.tsx` | Shared layout with AppBar + Tabs + Container   |

### Deleted Files (20)

**17 CSS Module files:**

```
shared/ui/Button.module.css
shared/ui/Input.module.css
shared/ui/IconButton.module.css
shared/ui/Layout.module.css
shared/ui/Modal.module.css
shared/ui/TaskNav.module.css
shared/ui/ErrorBoundary.module.css
features/create-task/ui/CreateTaskForm.module.css
features/edit-task/ui/EditTaskForm.module.css
features/complete-task/ui/CompleteCheckbox.module.css
features/search-tasks/ui/TaskFilters.module.css
entities/task/ui/TaskCard.module.css
entities/task/ui/TaskList.module.css
pages/today/ui/TodayPage.module.css
pages/upcoming/ui/UpcomingPage.module.css
pages/completed/ui/CompletedPage.module.css
pages/search/ui/SearchPage.module.css
```

**3 icon components** (replaced by `@mui/icons-material`):

```
shared/ui/PlusIcon.tsx
shared/ui/TrashIcon.tsx
shared/ui/FilterIcon.tsx
```

### Dependencies Added

```
@mui/material
@emotion/react
@emotion/styled
@mui/icons-material
@fontsource/roboto
```

---

## Execution Order

```
Step 1 (disclosure) → 2A (foundation) → 2B (shared UI) → 2C (nav/shell) → 2D (features) → 2E (entities/pages) → 2F (polish)
```

Each phase produces a working, testable app. No phase depends on a later phase.

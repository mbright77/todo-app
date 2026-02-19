# Listy

Local-only, offline-first task list built with React, TypeScript, IndexedDB (Dexie), and MUI v7 with a Material Design 3-inspired theme.

## Features

- Offline-first, local storage with IndexedDB (no server required)
- Material Design 3 UI with light, dark, and system color modes
- Task creation via floating action button + dialog
- Global ordering: drag to reorder across all tabs (press-and-hold on mobile)
- Focus-friendly dialogs and accessible form labels
- Help page in the header
- PWA-ready with GitHub Pages deployment workflow
- Installed PWA checks for updates on load and silently refreshes to apply new versions

## Tech Stack

- React 19 + TypeScript
- Vite 7
- MUI v7 + Emotion
- Dexie + dexie-react-hooks
- vite-plugin-pwa

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run test`

## Deployment (GitHub Pages)

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.
It deploys on push to `main` and uses `BASE_URL` to set the correct Vite base path.

To enable Pages:

1. Settings -> Pages
2. Source: GitHub Actions

## Project Structure

- `src/app`: app shell, theme, routing
- `src/entities`: task data model, db access, and UI
- `src/features`: task creation, editing, filtering
- `src/pages`: Active, Upcoming, Completed, Search, Help
- `src/shared`: shared UI wrappers

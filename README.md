# Todo App

Local-only, offline-first todo app built with React, TypeScript, IndexedDB (Dexie), and MUI v7 with a Material Design 3-inspired theme.

## Features

- Offline-first, local storage with IndexedDB (no server required)
- Material Design 3 UI with light, dark, and system color modes
- Task creation via disclosure panel and floating action button
- Focus-friendly dialogs and accessible form labels
- PWA-ready with GitHub Pages deployment workflow

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
- `src/pages`: Today, Upcoming, Completed, Search
- `src/shared`: shared UI wrappers

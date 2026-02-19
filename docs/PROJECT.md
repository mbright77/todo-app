# Listy

## Documents
- `docs/PROJECT.md` -- Product overview and scope
- `docs/ARCHITECTURE.md` -- Code structure and technical decisions
- `docs/DESIGN_GUIDE.md` -- UI/UX direction and design rules
- `docs/ROADMAP.md` -- Phased plan and delivery status

## Product
A local-only, offline-first task list for mobile and desktop.

No accounts.
No server.
No cloud sync.

## Users
Single user on one device.

## Core Features
- Create tasks
- Complete tasks
- Edit tasks
- Delete tasks
- Task lists (Active, Upcoming, Completed)
- Search
- Global ordering (drag to reorder)
- Help page

## Data Rules
All data is stored locally on the device.
No remote APIs.
No telemetry.
No analytics.

## Technology
Frontend: React + TypeScript
Platform: PWA
Storage: IndexedDB (Dexie)

## PWA Updates
The installed PWA checks for updates on load and will silently refresh to apply new versions.

## Non-Goals
- No user accounts
- No sync
- No sharing
- No backend

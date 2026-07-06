# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

PicUp Client is a React + TypeScript + Vite frontend for a photo-event management application. It communicates with a local backend (Java/Spring, port `8080`) for managing photography events — users create events, select folders of photos, pick which faces to include, and track processing/results.

## Tech Stack

- **React 19** with **TypeScript 6**
- **Vite 8** build tool (bundler module resolution)
- **react-router-dom v7** for client-side routing
- **Axios** for HTTP requests
- **@tanstack/react-query v5** (installed but not yet used in the codebase)
- **react-dropzone v15** (installed but not yet used — intended for upload)
- **ESLint 10** flat config with typescript-eslint

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server
npm run build        # TypeScript check + production build
npm run lint         # Run ESLint
npm run preview      # Preview production build locally
```

## Architecture

### Entry & Bootstrapping

- [src/main.tsx](src/main.tsx) — App entry. Wraps everything in `<AuthProvider>`.
- [src/App.tsx](src/App.tsx) — Root component. Defines all routing inline in two modes: unauthenticated (login/register) and authenticated (main app shell with sidebar + routes). Wraps authenticated routes in `<EventProvider>`.

### Directory Layout

```
src/
├── api/           # Axios instance (api.ts)
├── assets/        # Static images (hero.png, boilerplate SVGs)
├── components/    # Reusable UI (ImageCard, ImageGrid, ProgressBar, UploadZone)
├── contexts/      # React Context providers (AuthContext, EventContext)
├── models/        # TypeScript interfaces (Customer, Event, Category, etc.)
├── pages/         # Route-level page components
│   ├── Auth/      # LoginPage, RegisterPage
│   ├── Event/     # MyEventsPage, AddEventForm, FamilySelectionPage
│   ├── category/  # CategoryPage
│   ├── Customer/  # CustomerPage
│   ├── Dashboard/ # Dashboard (static placeholder)
│   ├── Upload/    # Upload page (static placeholder)
│   ├── Processing/# Processing page (static placeholder)
│   ├── Results/   # Results page (static placeholder)
│   └── Settings/  # Settings page (static placeholder)
├── services/      # API service modules (authService, eventService, etc.)
├── layouts/       # AppLayout (unused)
├── routes/        # Legacy route config (unused — routes are inline in App.tsx)
└── types/         # Placeholder (all real types are in models/)
```

### State Management

Two React Contexts, no external state library:

1. **AuthContext** (`src/contexts/AuthContext.tsx`) — `user: Customer | null` persisted to `localStorage` under key `picup-user`. Provides `useAuth()` hook with `login()`, `logout()`, `setUser()`.

2. **EventContext** (`src/contexts/EventContext.tsx`) — `event: Event | null` and `selection: FamilySelection`. Tracks the current event being created and which faces were selected. Provides `useEventContext()` hook.

### API Layer

- Axios `create()` with `baseURL: "http://localhost:8080"` at [src/api/api.ts](src/api/api.ts).
- Service files in [src/services/](src/services/) each wrap a resource: `authService`, `customerService`, `eventService`, `categoryService`, `categoryOfEventService`.
- Some pages (AddEventForm, FamilySelectionPage) use direct `fetch()` to `http://127.0.0.1:8080` for native folder-picker and face-detection endpoints — these bypass the Axios instance intentionally.
- No auth tokens or interceptors — the backend appears to not require auth headers beyond the initial login.

### Routing

All routes are defined inside [src/App.tsx](src/App.tsx) (the `routes/index.ts` file is dead code). Two router trees:

- **Unauthenticated**: `/login`, `/register`, everything else → `/login`
- **Authenticated**: `/` (MyEventsPage), `/event/family-selection`, `/upload`, `/processing`, `/results`, `/settings`, `/categories`, `*` → `/`

### Page Status

- **Fully implemented**: LoginPage, RegisterPage, MyEventsPage, AddEventForm, FamilySelectionPage, CategoryPage, CustomerPage
- **Static placeholders** (hardcoded content, not connected to backend): Dashboard, Upload, Processing, Results, Settings

## TypeScript Config Notes

- `verbatimModuleSyntax: true` — imports must use `import type` for type-only imports.
- `erasableSyntaxOnly: true` (TS 6 feature) — no enums, no namespaces, no parameter properties.
- `noUnusedLocals: true`, `noUnusedParameters: true` — unused variables/parameters will error.
- Target `es2023`, bundler module resolution, JSX is `react-jsx`.

## Key Patterns

- Each reusable component lives in its own folder under `src/components/` with an `index.tsx` barrel.
- Pages are organized by feature folder under `src/pages/`.
- CSS is mostly co-located with pages (e.g., `auth.css`, `event.css`), plus global `App.css` and `index.css`.
- Error handling follows a `try/catch` + `setError(errorMessage)` pattern in pages.
- The sidebar is a Hebrew-language UI (תפריט button, RTL text).
- The backend runs on `localhost:8080` and serves both REST API endpoints and desktop-integration endpoints (folder picker via `POST /event/select-folder`, face detection via `POST /event/get_faces`).

## Dead Code / Cleanup Opportunities

- [src/routes/index.ts](src/routes/index.ts) — unused legacy route config.
- [src/layouts/index.ts](src/layouts/index.ts) — unused AppLayout component.
- [src/types/index.ts](src/types/index.ts) — empty placeholder (exports nothing).
- `src/models/FamilySelection.ts` — duplicate of the inline interface in EventContext.tsx.
- `@tanstack/react-query` and `react-dropzone` are dependencies that are not yet used.
- Boilerplate assets in `src/assets/` (react.svg, vite.svg) are not imported anywhere.
- Large commented-out code block in `CustomerPage.tsx`.

## Backend Dependency

The backend is a Java/Spring application expected at `http://localhost:8080`. The client won't function without it. Key backend-dependent flows:
- User registration and login
- Creating events with folder path selection (desktop integration)
- Face detection and selection for family photo curation
- Category and customer CRUD

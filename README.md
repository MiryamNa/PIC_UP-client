# PicUp Client

PicUp Client is a React + TypeScript + Vite application for managing events with a login flow and a hidden expandable sidebar.

## Features

- Login and register pages with protected routes
- Hidden sidebar opened by a floating `תפריט` button
- Logout button inside the sidebar
- Event dashboard with card-based event display
- Add event card-style action
- Routes for Upload, Processing, Results, Settings, and Categories
- API integration using `axios`
- Local authentication context for user session state

## Project structure

- `src/App.tsx` — main app shell, routing, sidebar toggle, and auth guard
- `src/pages/Auth` — login and registration pages
- `src/pages/Event` — event listing, add event card, and event form
- `src/pages/Upload` — upload workflow page
- `src/pages/Processing` — processing workflow page
- `src/pages/Results` — results workflow page
- `src/pages/Settings` — settings page
- `src/pages/category` — category management page
- `src/contexts/AuthContext.tsx` — authentication context provider
- `src/services` — API service modules

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Available scripts

- `npm run dev` — start development server
- `npm run build` — build production output
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build locally

## Dependencies

- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `react-dropzone`
- `@tanstack/react-query`

## Notes

- The sidebar is hidden by default and opens via the top-left `תפריט` button.
- Users are redirected to login if they are not authenticated.
- The application is configured with an auth context and router-based protected routes.

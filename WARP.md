# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling and commands

This is a React + Vite SPA using plain JavaScript, React Router, Tailwind CSS v4, ESLint, and lucide-react icons.

### Install dependencies

```bash path=null start=null
npm install
```

(You can substitute `pnpm` or `yarn` if the project is using those in your environment.)

### Run the dev server

```bash path=null start=null
npm run dev
```

This starts the Vite dev server (by default on `http://localhost:5173`). The app assumes a backend running on `http://localhost:5000` for authentication and document APIs.

### Build for production

```bash path=null start=null
npm run build
```

Outputs a production bundle to `dist/` using Vite.

### Preview the production build

```bash path=null start=null
npm run preview
```

Serves the built `dist/` bundle via Vite’s preview server.

### Lint the codebase

```bash path=null start=null
npm run lint
```

This runs ESLint with the configuration in `eslint.config.js` (JS/JSX files only, browser globals, React hooks rules, and `react-refresh/only-export-components`).

### Tests

There is currently no test runner or test script configured in `package.json`, so there is no standard command for running a single test yet.

## Application architecture

### High-level structure

- Entry point: `src/main.jsx` mounts React into `#root`, imports global styles from `src/index.css`, and wraps `App` with `AuthProvider` and `ThemeProvider` from `src/contexts/`.
- Root application: `src/App.jsx` defines the top-level routing with React Router and also wraps its routes in `ThemeProvider` and `AuthProvider`, plus a `BrowserRouter`.
  - Note: Providers (`AuthProvider`, `ThemeProvider`) are currently instantiated both in `main.jsx` and `App.jsx`, so components using `useAuth` and `useTheme` see a nested provider hierarchy.
- Pages live under `src/pages/<Section>/<Page>.jsx` and are wired into `App.jsx` routes:
  - `Landing` (marketing/home), `Services`, `About`, `Contact` are public marketing pages.
  - `Login` and `Signup` handle authentication flows.
  - `Dashboard` is a protected, authenticated area for document management.
- Global state and cross-cutting concerns are handled via React Context in `src/contexts/`:
  - `AuthContext.jsx` manages authentication state and backend integration.
  - `ThemeContext.jsx` manages light/dark theme and coordinates with Tailwind’s `dark` variant.
- Styling is primarily Tailwind CSS utility classes plus some inline styles based on color constants.

### Routing and access control

- `src/App.jsx` uses `BrowserRouter`, `Routes`, and `Route` from `react-router-dom` to define the SPA routes:
  - `/` → `Landing`
  - `/register` → `Signup`
  - `/login` → `Login`
  - `/about` → `About`
  - `/contact` → `Contact`
  - `/services` → `Services`
  - `/dashboard` → `Dashboard` (protected)
  - `*` → redirects back to `/`.
- `ProtectedRoute` in `App.jsx` uses `useAuth()` to check `isAuthenticated` and redirects unauthenticated users to `/login` using `<Navigate to="/login" replace />`.
- In addition to context-level protection, `Dashboard` also performs its own token check on mount (via `localStorage.getItem('token')`) and redirects to `/login` if absent.

When adding new pages:
- Create the component under `src/pages/<Section>/<Name>.jsx`.
- Import and register it in `src/App.jsx` as a new `Route`.
- For routes that should require login, wrap the element with `ProtectedRoute`.

### Authentication and backend integration

Authentication and data fetching are built around a Node/Express-style backend at `http://localhost:5000`.

- `src/contexts/AuthContext.jsx`:
  - Uses `AuthContext` to expose `{ user, login, logout, isAuthenticated }`.
  - On initial load, `useEffect` reads `token` and `user` from `localStorage`; if present and parseable, it sets `user` and marks loading complete.
  - `login(credentials)` performs a `POST` to `http://localhost:5000/api/auth/login`, expects `{ token, user }` in the response, stores them in `localStorage`, and updates context state.
  - `logout()` clears `token` and `user` from `localStorage` and resets `user`.
- `src/pages/Auth/Login.jsx`:
  - Uses `useAuth()` and calls `login({ email, password })` from `AuthContext`.
  - On successful login, navigates to `/dashboard` with `useNavigate()`.
  - Manages its own loading and error UI state but delegates actual auth logic to the context.
- `src/pages/Auth/Signup.jsx`:
  - Talks directly to the backend (`http://localhost:5000/api/auth/register`) using `fetch` instead of going through `AuthContext`.
  - On success, redirects the user to `/login`.

Document management in `Dashboard` is also backend-driven:

- `src/pages/Dashboard/Dashboard.jsx`:
  - Uses an `API_URL` of `http://localhost:5000/api`.
  - On mount, reads `token` and `user` from `localStorage`; if the token is missing, it navigates to `/login`.
  - Defines `getAuthHeaders()` to attach the Bearer token to all API requests.
  - Implements CRUD for documents via REST endpoints:
    - `GET /documents` → `fetchDocuments()` to load the list into `documents` state.
    - `POST /documents` → `handleAddDoc()` to create a new document and prepend it to `documents`.
    - `DELETE /documents/:id` → `handleDeleteDoc()` to remove from backend and then from local state.
    - `PUT /documents/:id` → `handleUpdateDoc()` to update the document name and then patch local state.
  - Uses local component state to manage editing modes (`editingId`, `editName`), loading indicators, and error messages.
  - Logout here clears auth-related `localStorage` entries and navigates back to `/login`.

Backend URLs are currently hardcoded in multiple files (`AuthContext.jsx`, `Dashboard.jsx`, `Signup.jsx`). If you change the backend base URL or path structure, update all of these locations (or centralize the URL into a shared config module before refactoring usages).

### Theming and styling

The app implements a simple light/dark theme system built on top of Tailwind’s `dark` variant and a Theme context.

- Tailwind v4 is enabled via `@tailwindcss/vite` in `vite.config.js` and an `@import "tailwindcss";` in `src/index.css`.
- `src/index.css` defines a custom variant:
  - `@custom-variant dark (&:where(.dark, .dark *));`
  - This lets Tailwind’s `dark:` utilities respond to the presence of a `dark` class on the root `<html>` element.
- `src/contexts/ThemeContext.jsx`:
  - Holds the current `theme` (`'light'` or `'dark'`) in state and persists it to `localStorage`.
  - On theme changes, adds/removes the `dark` class on `document.documentElement` and updates `localStorage`.
  - Exposes `{ theme, toggleTheme }` through `ThemeContext` and the `useTheme()` hook.
- Components such as `Landing`, `Services`, `Contact`, `About`, `Login`, and `Signup`:
  - Use `useTheme()` to read the current theme and adjust layout and colors.
  - Rely heavily on Tailwind classes (with the `dark:` variant) plus inline styles computed from color constants.

When creating new components, prefer to:
- Use `useTheme()` for theme-aware behavior rather than re-reading `localStorage` or the DOM directly.
- Use Tailwind utilities (including `dark:`) for most styling, following the patterns in `Landing` and `Services`.

### Libraries and configuration

- **React Router**: `react-router-dom` v7 is used; routing is centralized in `src/App.jsx` using `<Routes>`/`<Route>` and `<Navigate>` for redirects.
- **lucide-react**: Icons are imported where needed (e.g., `Dashboard`, `Landing`, `Login`, `Signup`, `Services`, `Contact`) and used as React components.
- **ESLint**: Configured via `eslint.config.js` with:
  - `@eslint/js` recommended rules.
  - `eslint-plugin-react-hooks` recommended rules.
  - `eslint-plugin-react-refresh` to enforce export patterns compatible with React Fast Refresh.
  - `no-unused-vars` customized so variables matching `^[A-Z_]` are ignored (useful for constants).
- **Vite**: `vite.config.js` enables React (`@vitejs/plugin-react`) and Tailwind v4 (`@tailwindcss/vite`).

These configurations are the main levers to adjust when changing how the app is built, linted, or styled.
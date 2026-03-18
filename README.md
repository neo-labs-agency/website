## Neo Labs Agency — Architecture & Setup

Neo Labs Agency is a marketing/landing website built on **React Router (Vite)** with a **Feature‑Sliced Design (FSD)** front‑end architecture.

### Tech stack

- **Runtime / framework**: React Router v7 (Vite dev/build), TypeScript
- **Styling**: Tailwind CSS
- **i18n**: `i18next`, `react-i18next`, JSON locale files
- **Forms & validation**: `react-hook-form`, `zod`
- **Build tooling**: Vite with custom `manualChunks` and a chunk‑size guard plugin

### Project layout

- **`app/`** – React Router entry and routes (framework layer, outside FSD):
  - `root.tsx` – HTML shell, Google Analytics wiring, global error boundary, language sync, `PageLoadBlur`
  - `routes/` – route modules (e.g. `home.tsx`) that compose FSD pages
- **`src/`** – all application code, organised by **Feature‑Sliced Design**:
  - **`shared/`** – Reusable, framework‑agnostic pieces:
    - `ui/` – design‑system primitives (`button`, `glass-card`, `lazy-load-image`, `page-load-blur`, etc.)
    - `lib/` – helpers like `lazy-with-preload`, general utilities
    - `hooks/` – cross‑cutting hooks such as `use-language-sync`
    - `config/` – theming and other shared configuration
    - `utils/` – generic utilities and re‑exports
  - **`entities/`** – Domain models and types:
    - `service/` – service descriptors and types
    - `project/` – portfolio project types
  - **`features/`** – User‑level actions and flows:
    - `contact-form/` – contact form UI, validation schema, submit API client
  - **`widgets/`** – Page‑level composition blocks:
    - `header`, `footer`, `hero`, `services`, `about`, `portfolio`, `contact` – each widget glues together features/entities/shared UI
  - **`pages/`** – Route‑level pages:
    - `home/` – `HomePage` and preload helpers that assemble the homepage from widgets
  - **`locales/`** – `en.json`, `ru.json`, `hy.json` locale dictionaries
  - **`i18n.ts`** – i18next client configuration used by the app shell and features

### Feature‑Sliced Design rules

- **Import directions**:
  - `pages` → can import from `widgets`, `features`, `entities`, `shared`
  - `widgets` → can import from `features`, `entities`, `shared`
  - `features` → can import from `entities`, `shared`
  - `entities` → can import from `shared`
  - `shared` → **must not** import from higher layers
- **Route layer isolation**:
  - `app/routes/*` should not reach into low‑level folders directly; they import **pages** (e.g. `@/pages/home`) to keep routing concerns separate from UI/business structure.

### Vite / build architecture

- **Path aliases**: `@/*` points to `src/*` (configured via `vite-tsconfig-paths`), so imports like `@/shared/ui/button` are used instead of long relative paths.
- **Code‑splitting**:
  - `vite.config.ts` defines a custom `manualChunks` function that groups chunks by FSD layer (e.g. `shared-ui-button`, `shared-ui-glass-card`, `entities`, `features`, `i18n-app`, `locales`, etc.).
  - A custom `enforceChunkSizePlugin` fails the build if any non‑exempt JS chunk exceeds **200 KB**, encouraging good bundle hygiene.

### Running the app

- **Install dependencies**:

  ```bash
  npm install
  ```

- **Development** (Vite dev server with HMR):

  ```bash
  npm run dev
  ```

  By default the server runs on `http://localhost:3000` (see `vite.config.ts`).

- **Build for production**:

  ```bash
  npm run build
  ```

  This produces:

  - `build/client` – static assets served to the browser
  - `build/server` – server bundle for React Router’s app server

### Deployment notes

- The generated server bundle is **Node‑ready** and can be deployed to any Node hosting platform (Docker, Render, Railway, Fly.io, etc.).
- If you use Docker or another container system, ensure you:
  - Run `npm run build` at image build time.
  - Serve `build/client` as static assets and run the React Router server from `build/server`.


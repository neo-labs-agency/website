# Feature-Sliced Design (FSD) structure

- **app/** — React Router entry, routes, global styles (outside `src`)
- **shared/** — UI kit, lib (utils), config. No business logic.
- **entities/** — Business entities: `service`, `project` (types/models).
- **features/** — User-facing actions: `contact-form`.
- **widgets/** — Composite UI: `header`, `hero`, `services`, `about`, `portfolio`, `contact`.
- **pages/** — Full pages composing widgets: `home` → Hero, Services, About, Portfolio, Contact.

Import rule: pages → widgets → features → entities → shared. App imports from `@/*` (src).

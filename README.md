# Chirp

Chirp is a lightweight desktop push-to-talk radio built with Tauri, React, TypeScript and Vite.

Phase 1 establishes the application shell, radio state model, native desktop boundary, theme engine and settings foundation. Networking and live audio are intentionally not part of this phase.

## Development

```powershell
pnpm install
pnpm check
pnpm tauri dev
```

## Source layout

```text
src/
├── app/          Application composition
├── components/   Presentational UI grouped by feature
├── core/         Product state and domain rules
├── hooks/        Browser/input adapters
├── native/       Tauri-only frontend boundary
├── themes/       Theme definitions and token application
└── styles/       Global visual system

src-tauri/
├── capabilities/ Tauri permission surface
└── src/          Native window/tray lifecycle
```

See [`docs/architecture.md`](docs/architecture.md) for the boundaries that future phases should preserve.

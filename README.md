# Chirp

Chirp is a lightweight desktop push-to-talk radio built with Tauri, React, TypeScript and Vite.

The current implementation includes the native desktop shell, reducer-driven radio model, semantic theme engine and the Phase 2 interaction/visual pass. Networking and live audio intentionally remain outside the UI layer until later phases.

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

Motion is used selectively for spring interactions, layout transitions and enter/exit choreography. Continuous decorative effects remain CSS-based and are disabled by the reduced-motion setting.

See [`docs/architecture.md`](docs/architecture.md) for the boundaries that future phases should preserve.

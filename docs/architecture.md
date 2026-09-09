# Chirp architecture

## Principles

Chirp is intentionally small. Organization exists to keep future features replaceable, not to create abstraction for its own sake.

### `app/`

Composes the product. It may connect feature hooks and components, but it should not contain radio protocol rules or Tauri implementation details.

### `components/`

Presentational React components grouped by responsibility. Components receive state and callbacks through props. They do not talk directly to Supabase, LiveKit or Tauri.

### `core/`

Product state and rules. The radio reducer is the source of truth for valid radio transitions. Future realtime events should be translated into radio events instead of mutating UI state directly.

### `hooks/`

Input adapters and browser lifecycle behavior. The current Space-key push-to-talk hook is deliberately isolated so a native global-hotkey source can replace or supplement it later.

### `native/`

The only frontend layer allowed to call Tauri APIs directly. Window controls live here now; future notification, autostart and global-shortcut adapters should follow the same rule.

### `themes/`

Themes are semantic token sets, not alternate layouts. A future theme may change color, radius, material, motion and effects while the functional layout remains predictable.

### `styles/`

Global CSS consumes semantic variables only. Feature components should avoid hard-coded theme colors unless the color has fixed platform meaning, such as the Windows close-button danger state.

## Phase boundaries

1. Foundation and desktop shell
2. Interaction polish and audio-reactive visuals
3. Accounts and realtime radio state
4. Live WebRTC push-to-talk audio
5. Theme ecosystem, optimization and release infrastructure

## Non-negotiable dependency direction

```text
components -> core types
app -> components + core + hooks
hooks -> core callbacks
native -> Tauri
core -> no Tauri, no React UI, no backend SDK
backend adapters -> core events
```

Supabase and LiveKit should enter through adapters in later phases. They should never become dependencies of presentation components.

# Logical

A chat-based logical reasoning test. Users chat with an AI, then receive an evaluated score they can share via a unique URL.

> **Note:** All commits to `main` are auto-deployed to Vercel.

## User Flow

```
/  (front page)
 └─ click "Start Test"
     └─ /chat  (chat with AI)
         └─ click "End Chat"
             └─ /evaluating  (progress bar, ~2s)
                 └─ /result/{slug}  (score + share link)
```

1. **Front page (`/`)** — Title, description, and a "Start Test" button.
2. **Chat (`/chat`)** — Full-screen chat UI. User sends messages, AI responds (currently dummy responses). An "End Chat" button appears after the first message.
3. **Evaluating (`/evaluating`)** — Animated progress bar with status text. Computes a score (currently counts user messages), encodes it into a URL slug, and redirects.
4. **Result (`/result/{slug}`)** — Displays the decoded result. Share button uses the Web Share API (falls back to clipboard copy). A "Try it yourself" link returns to `/`.

## Project Structure

```
src/
├── app.css                          # Global styles (neutral monochrome theme)
├── app.html                         # HTML shell
├── lib/
│   ├── assets/
│   │   └── favicon.svg              # Favicon
│   ├── chat-state.svelte.js         # Shared chat state (Svelte 5 $state rune)
│   ├── index.js                     # $lib barrel (unused)
│   └── utils.js                     # encodeResult / decodeResult (base64url)
└── routes/
    ├── +layout.svelte               # Root layout (loads global CSS, favicon)
    ├── +page.svelte                  # Front page
    ├── chat/
    │   └── +page.svelte             # Chat UI
    ├── evaluating/
    │   └── +page.svelte             # Evaluation loading screen
    └── result/
        └── [slug]/
            ├── +page.js             # Load function (decodes slug)
            └── +page.svelte         # Result display + share
```

### Key Modules

#### `src/lib/chat-state.svelte.js`

Module-level reactive state using Svelte 5 `$state` rune. Persists across client-side navigations.

- `getMessages()` — returns the reactive messages array
- `addMessage(role, text)` — pushes a `{ role: 'user' | 'ai', text }` object
- `clearMessages()` — empties the array (called on chat mount)

#### `src/lib/utils.js`

- `encodeResult(text)` — encodes a string to a base64url slug (URL-safe, no padding)
- `decodeResult(slug)` — decodes a base64url slug back to the original string

The result is encoded entirely in the URL — there is no database.

## Tech Stack

- **[SvelteKit](https://svelte.dev/docs/kit)** v2 with **Svelte 5** (runes mode)
- **Vite** v7 (build tool)
- **Vercel** adapter for deployment
- **JavaScript** (no TypeScript)

## Design

Mobile-first, neutral monochrome theme with minimal color usage:

| Token     | Value     | Usage                                    |
|-----------|-----------|------------------------------------------|
| `#111`    | Near-black | Text, buttons, user chat bubbles, accent |
| `#333`    | Dark gray  | Button hover                             |
| `#666`    | Mid gray   | Subtitle / secondary text                |
| `#e0e0e0` | Light gray | Borders, input outlines                  |
| `#f5f5f5` | Off-white  | AI chat bubbles, result card background  |
| `#fff`    | White      | Page background                          |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build & Preview

```bash
npm run build
npm run preview
```

## Deployment

Deployed to Vercel via `@sveltejs/adapter-vercel`. Every push to `main` triggers an automatic deployment.

## Roadmap

- Replace dummy AI responses with real AI agent integration
- Replace message-count evaluation with actual logic scoring

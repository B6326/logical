# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed
- Redesigned all pages with a neutral monochrome theme (single accent color `#111`)
- Removed all blues (`#4361ee`), reds (`#e74c3c`), and gray background (`#f8f9fa`)
- Fixed body layout — removed flex centering that broke full-height chat page
- `.container` now self-centers with `margin: 0 auto` and `min-height: 100dvh`
- Chat page fills full viewport width on mobile, caps at `640px` on desktop
- "End Chat" button changed from red filled to subtle outlined ghost button
- Progress bar thinned to 4px with black fill
- Result card uses `#f5f5f5` background instead of white with border
- Input focus border changed from blue to black
- Links styled with underline instead of color

### Added
- Chat UI at `/chat` with message bubbles and text input
  - User messages (black, right-aligned) and AI messages (light gray, left-aligned)
  - Dummy AI responses from a rotating array with 500-1000ms simulated delay
  - "End Chat" button appears after first user message
  - Auto-scrolls to bottom on new messages
  - Clears message history on mount for fresh sessions
- Evaluation loading page at `/evaluating`
  - Animated progress bar over ~2 seconds
  - Status text transitions ("Analyzing..." then "Computing...")
  - Counts user messages and encodes result into URL slug
  - Redirects to `/result/{slug}` with `replaceState`
  - Guards against direct navigation (redirects to `/` if no messages)
- Shared chat state module (`src/lib/chat-state.svelte.js`)
  - Svelte 5 module-level `$state` for messages
  - `getMessages()`, `addMessage()`, `clearMessages()` exports
- Front page "Start Test" button navigating to `/chat`
- Subtitle text on front page describing the test
- `.subtitle` CSS class in global styles
- `CHANGELOG.md`

### Removed
- Text input form on front page (replaced by Start Test button)
- `encodeResult` import and `text` state from front page

## [0.0.1] - 2025-02-12

### Added
- Initial SvelteKit project setup with Svelte 5
- Front page with text input and submit button
- Result page at `/result/[slug]` displaying decoded text
- Share button with Web Share API and clipboard fallback
- `encodeResult` / `decodeResult` base64url utilities
- Vercel adapter for deployment
- Global CSS with responsive layout

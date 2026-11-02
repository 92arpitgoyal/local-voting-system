# Team-Echo

A planned suite of small team-ritual tools, such as retrospectives and decision voting, available under one login. The larger goal is to become the memory of how a team works: decisions, lessons, and commitments that accumulate over time. The product name is Team-Echo, with a logo of echo arcs; domain availability is not yet checked.

## Current state

This repository holds early prototypes. There is no build step, backend, or login yet.

| Page | File | Notes |
| --- | --- | --- |
| Entry page | `index.html` | Lists every tool as a card, available or coming soon. |
| Retro board | `retro.html` | A static mockup in the style of EasyRetro. |
| Purchase voting | `voting.html`, `js/voting/` | Vanilla JavaScript. Saves to the browser's `localStorage`. |

Shared code: `js/site.js` holds the tool list and the header used by every page, and `css/app.css` holds the few styles Tailwind cannot express. All pages load Tailwind from a CDN.

To add a tool, add an entry to the `TOOLS` list in `js/site.js` and create its page.

## Run with hot reload

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:8000. The page reloads whenever a file changes. The pages are `/`, `/retro.html`, and `/voting.html`.

## Decisions so far

- All tools live in one codebase.
- Styling uses Tailwind with Flowbite as the component library.

## Still open

Tool list, technology stack, sign-in, database, billing, pricing, domain, and name. See [docs/product-idea.md](docs/product-idea.md).

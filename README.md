# Team-Echo

A planned suite of small team-ritual tools, such as retrospectives and decision voting, available under one login. The larger goal is to become the memory of how a team works: decisions, lessons, and commitments that accumulate over time. The product name is Team-Echo, with a logo of echo arcs; domain availability is not yet checked.

## Current state

This repository holds early prototypes. There is no build step, backend, or login yet.

| Tool | Location | Notes |
| --- | --- | --- |
| Purchase voting | `index.html`, `js/`, `css/` | Vanilla JavaScript. Styled with Tailwind and Flowbite classes. Saves to the browser's `localStorage`. |
| Retro board | `Retro board (Flowbite style).html` | A single static mockup in the style of EasyRetro. |

Both tools load Tailwind from a CDN and share the same navigation bar and visual style.

## Run with hot reload

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:8000. The page reloads whenever a file changes. The retro board is at `/Retro%20board%20(Flowbite%20style).html`.

## Decisions so far

- All tools live in one codebase.
- Styling uses Tailwind with Flowbite as the component library.

## Still open

Tool list, technology stack, sign-in, database, billing, pricing, domain, and name. See [docs/product-idea.md](docs/product-idea.md).

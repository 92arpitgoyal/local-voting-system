# TeamRituals (working name)

A planned suite of small team-ritual tools, such as retrospectives and decision voting, available under one login. The product name is not final.

## Current state

This repository holds early prototypes. There is no build step, backend, or login yet.

| Tool | Location | Notes |
| --- | --- | --- |
| Purchase voting | `index.html`, `js/`, `css/` | Vanilla JavaScript. Styled with Tailwind and Flowbite classes. Saves to the browser's `localStorage`. |
| Retro board | `Retro board (Flowbite style).html` | A single static mockup in the style of EasyRetro. |

Both tools load Tailwind from a CDN and share the same navigation bar and visual style.

## Run the voting app

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Decisions so far

- All tools live in one codebase.
- Styling uses Tailwind with Flowbite as the component library.

## Still open

Tool list, technology stack, sign-in, database, billing, pricing, domain, and name. See [docs/product-idea.md](docs/product-idea.md).

# Decision log

A running record of technical and architecture decisions, with the reasoning behind each. The current outcome of every decision is summarized in [final-decisions.md](final-decisions.md).

## 2026-11-03: Language and framework

- **Decision:** TypeScript with Next.js, in one codebase.
- **Context:** The team is most comfortable with JavaScript or TypeScript. The free utilities need search traffic, so pages must be rendered on the server. The logged-in app should live in the same codebase.
- **Alternatives considered:** Not yet compared in detail.
- **Status:** Accepted.

## 2026-11-03: Styling

- **Decision:** Tailwind with the Flowbite component library.
- **Context:** Decided earlier in the project and recorded in the product idea document.
- **Status:** Accepted.

## 2026-11-03: Hosting

- **Decision:** Vercel for the application, using managed services to keep operations work low.
- **Context:** The user prefers managed services over running their own servers.
- **Status:** Accepted.

## 2026-11-03: Live updates

- **Decision:** Shared tools such as the retro board and dot voting should update live for everyone.
- **Context:** The user chose live updates. The mechanism is not yet chosen.
- **Status:** Accepted as a requirement; mechanism open.

## 2026-11-03: Ranking visuals

- **Decision:** Ranked items, such as the top three Combined results cards, show rank with shades of the app's blue and soft blobs, strongest for first place. Gold, silver, bronze and similar medal colors are not used.
- **Context:** The first card's blue border looked like a selection, and a medal-color attempt was rejected by the user.
- **Status:** Accepted.

## Open decisions

- Database
- Sign-in
- Live update mechanism
- Data model for teams and history

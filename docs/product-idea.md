# Product idea

Status: draft. Sections marked "To be filled" are still waiting for content.

## Summary

A suite of scrum and decision tools for teams, available under one login, similar in spirit to smallpdf.com. The larger goal is to become the memory of how a team works.

Scope: team-ritual tools and basic utilities around them.

## The big idea: the memory of how a team works

Most teams run on rituals such as retros, standups, planning, and decisions, but each one is forgotten the moment it ends. The suite becomes the place where a team's decisions, lessons, and commitments accumulate, so the team gets better over time instead of repeating itself.

### What it becomes

- **From tools to a team record.** Every retro, decision, and action item feeds one timeline. "Why did we choose this?" and "Haven't we complained about this before?" become answerable.
- **Closing the loop.** A retro insight becomes an action, the action becomes a decision, and the decision is revisited later to check whether it worked. Almost no product does this end to end.
- **Team health over time.** Recurring pain points, follow-through rate, and decision quality show up as a trend. That gives managers something concrete to act on.
- **Onboarding for free.** A new joiner reads the team's decision history and learns why things are the way they are.

### Why it is bigger than a utility suite

- Utilities bring traffic, but the accumulated history creates lock-in. The longer a team uses it, the more valuable it becomes and the harder it is to leave.
- It moves the buyer from the Scrum Master to the person who cares about how the team performs.

Possible category name: "team memory", or a "decision and learning system" for teams.

## Two layers of tools

### Free utilities (no login, the traffic layer)

| Tool | What it does |
| --- | --- |
| Random order picker | Decides who speaks first in standup |
| Planning poker | Quick estimation with cards |
| Meeting timer | Timeboxes agenda items |
| Meeting cost calculator | Shows what a meeting costs in salary time |
| RICE, ICE, and MoSCoW calculator | Scores and ranks priorities |
| Icebreaker generator | Random warm-up questions |
| Agenda builder | Turns a goal into a timed agenda |
| Team charter template | Fill-in working agreements |
| Pros and cons or decision matrix | Quick one-off decision help |

### Team memory layer (needed to start)

| Kind | Role in the big idea | Example |
| --- | --- | --- |
| Capture | Gets the team's thinking in | Retro board, async standup |
| Decide | Records choices and why | Decision log, scoring matrix |
| Commit | Turns talk into owned work | Action tracker |
| Review | Closes the loop later | Decision revisit reminders, retro trends |

### Starting set

One tool from each kind: retro board (capture), decision log (decide), action tracker (commit), and revisit reminders (review). Add free utilities alongside, since they cost little and bring visitors.

### Link between the layers

Each utility ends by offering to save its result into a core tool. For example, a decision matrix can be saved to the decision log.

## Existing prototypes

- **Retro board:** an EasyRetro-style board where a team adds cards, votes, and records action items. It maps to capture.
- **Purchase voting:** each voter spreads a limited number of votes across products, then combined results are shown. It could become a free utility or part of the decision log.

## Problem and audience

To be filled.

## Competitors and positioning

To be filled.

## Pricing and billing

Undecided.

## Technology

Decided: one codebase, Tailwind with Flowbite.

Undecided: framework, sign-in, database, real-time sync, hosting.

## Name and domain

Name chosen: Team-Echo. The logo is a dot with three echo arcs. Domain and trademark availability are not yet checked.

## Roadmap

To be filled.

## Risks and open questions

- The free utilities need no login, while the team memory layer needs accounts and storage. The boundary between them must be designed early.
- How real-time sharing between team members will work.
- Whether the team memory story is clear enough to sell, or whether one first tool should lead.

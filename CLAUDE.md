# CLAUDE.md — Agent Instructions

This file is the primary instruction set for any AI agent (Claude Code) working in this repository. Read this file in full before writing any code. If anything here conflicts with a later prompt in a session, this file wins unless the human explicitly overrides it for that session.

---

## 1. Project Identity

**What this is:** A full-stack, heavily-animated **furniture e-commerce platform** (working title TBD — see `prd.md`). Think a premium furniture/interior-goods store, not a generic template shop.

**Functional scope:** This project must implement the *same class of features* as a full-stack "pizza delivery" reference brief (user + admin roles, product catalog, cart, test-mode payment checkout, real-time order tracking, inventory management, automated low-stock alerts) — but re-mapped to a furniture-store domain end to end. Nothing in this project should look, read, or behave like a pizza/food ordering app. Every feature listed in `prd.md` is a furniture-domain equivalent of that functional brief (e.g. "choose pizza toppings" → "choose furniture material/finish/size"; "kitchen inventory" → "warehouse/SKU inventory").

**Reference material:** `/design-reference/` contains a furniture e-commerce UI kit (PDF + page screenshots: Home, Shop, Cart, Cart Sidebar, Checkout, Single Product, Product Comparison, Blog, Contact). These are provided **strictly for content/section-structure reference** — i.e. what sections a page needs, what fields a product card or checkout form shows, what a realistic IA (information architecture) for this type of store looks like.

**Design direction is intentionally different from the reference kit:** the reference kit is a flat, minimal e-commerce template. This project must be visually original — a modern, motion-rich, partially 3D experience (scroll-driven reveals, animated transitions, 3D product/scene elements), closer in spirit to premium agency-style sites than to the flat reference kit. Full art direction lives in `prd.md`. **Never copy the reference kit's colors, layout, typography, or copy text.**

---

## 2. Tech Stack (authoritative — see `techstack.md` for full detail)

- **Frontend:** React (Vite), React Router, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, React Three Fiber + Drei (Three.js), Lenis (smooth scroll), Zustand (client state)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Auth:** JWT (access + refresh token pattern), bcrypt for password hashing
- **Payments:** Razorpay (test mode only — no live keys ever)
- **Email:** Nodemailer (Gmail app password or Ethereal for dev)
- **Scheduled jobs:** node-cron (low-stock alerts)
- **Real-time:** Socket.io (order status updates)
- **Package manager:** npm (do not introduce yarn/pnpm lockfiles)

Do not add a framework, library, or service that isn't listed in `techstack.md` without explicitly flagging it to the human first and explaining why it's needed.

---

## 3. Repository Structure

```
/client                 → React app (Vite)
  /src
    /components          → reusable UI components (dumb/presentational where possible)
    /features             → feature-scoped logic (cart, catalog, auth, admin) — colocate hooks + components
    /animations            → shared GSAP timelines, Framer variants, R3F scene components
    /pages                  → route-level components
    /store                   → Zustand stores
    /lib                       → api client, utils, constants
    /assets                     → optimized images, 3D models (.glb), fonts
/server                 → Express app
  /src
    /models               → Mongoose schemas (Product, User, Order, Category, Review, etc.)
    /routes                 → route definitions
    /controllers              → business logic
    /middleware                 → auth, error handling, validation
    /jobs                          → node-cron jobs (low-stock alerts)
    /utils                           → helpers (email, tokens, etc.)
  server.js
/design-reference        → provided reference kit (content/IA reference ONLY — not visual reference)
CLAUDE.md
prd.md
techstack.md
todo.md
testing.md
.env.example (client and server each get their own)
```

Do not restructure these top-level folders without asking first — downstream instructions (`todo.md`, `testing.md`) assume this layout.

---

## 4. Build & Run Commands

```bash
# install (run in both /client and /server)
npm install

# frontend dev server
cd client && npm run dev

# backend dev server (nodemon)
cd server && npm run dev

# frontend production build
cd client && npm run build

# lint
npm run lint      # run in whichever workspace you touched

# tests (see testing.md for full policy)
npm run test
```

If a command doesn't exist yet in `package.json`, create it rather than running ad-hoc commands, so the human can always run the same command you did.

---

## 5. Environment Variables

Never hardcode secrets, API keys, or connection strings in source files. Always read from `process.env` (server) or `import.meta.env` (client, `VITE_` prefix only). Maintain `.env.example` files (committed, no real values) alongside real `.env` files (gitignored). If you need a new env var, add it to `.env.example` with a placeholder and tell the human what value they need to supply and where to get it.

Required server env vars (real values supplied by the human, never invented by you):
`PORT`, `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `CLIENT_URL`

Required client env vars:
`VITE_API_URL`, `VITE_RAZORPAY_KEY_ID`

---

## 6. Code Style & Conventions

- **Language:** Modern JS (ES modules) — no TypeScript unless the human explicitly asks to add it later.
- **Formatting:** Prettier defaults, 2-space indent, single quotes, semicolons on.
- **Components:** Functional components + hooks only. No class components.
- **Naming:** `PascalCase` for components, `camelCase` for functions/variables, `SCREAMING_SNAKE_CASE` for constants.
- **File naming:** Component files match the component name (`ProductCard.jsx`), one component per file where reasonably possible.
- **CSS:** Tailwind utility classes first; only drop into a CSS file for keyframes, complex GSAP-driven states, or things Tailwind genuinely can't express. No inline `style={{}}` unless it's a computed/dynamic value (e.g. animation progress).
- **Comments:** Comment *why*, not *what*. Every non-trivial animation timeline or 3D scene setup should have a short comment explaining the intended effect.
- **Commits:** Small, scoped commits with imperative-mood messages (`Add product filter drawer`, not `added stuff`). Commit after each meaningfully complete unit of work from `todo.md`, not at the end of the day.
- **No dead code:** Remove commented-out old implementations before committing; don't leave TODOs without a corresponding entry in `todo.md`.

---

## 7. Working Process (how to use the other project files)

1. Read `prd.md` before starting any feature — it defines *what* and *why*, including the furniture-domain mapping of every required feature.
2. Read `techstack.md` before adding any dependency — it defines *what tools are allowed*.
3. Work through `todo.md` **in order, top to bottom**, one task at a time. Do not jump ahead to a later phase (e.g. don't build payment integration before the cart works). Mark each task done in `todo.md` as you complete it.
4. Before marking any task complete, follow the relevant checks in `testing.md`.
5. If a task in `todo.md` turns out to be bigger than expected, break it into sub-tasks in place rather than silently doing a partial job and marking it done.

---

## 8. Animation & 3D Rules

- Animations must be **purposeful**, not decorative noise — each should reinforce a piece of content (product reveal, section transition, state change), not just spin/fade for its own sake.
- Every scroll-triggered or heavy animation must have a reduced-motion fallback (`prefers-reduced-motion`) — check for it and simplify/disable non-essential motion when set.
- 3D scenes (React Three Fiber) must lazy-load and show a lightweight loading state; never block first paint on 3D asset loading.
- Keep an eye on performance budget: target 60fps for scroll animations on a mid-range laptop. If a GSAP/R3F effect is janky, say so and propose a lighter alternative rather than shipping it as-is.
- Test animations at both desktop and mobile viewport sizes — many scroll/3D effects need to be simplified or disabled on mobile.

---

## 9. Design Tooling Available

This environment has two design-assist tools available for inspiration and component generation:
- A UI/UX design skill (locally installed) — consult it for layout, spacing, and interaction pattern ideas.
- A 21st.dev MCP connection — use it to pull component/animation ideas, but always adapt, restyle, and rewrite anything pulled from it to match this project's own visual identity (see `prd.md` for brand direction). Never paste a 21st.dev component in verbatim without adapting it.

---

## 10. Things You Must NOT Do

- Do not use any Razorpay **live** keys or process real payments — test mode only, always.
- Do not commit `.env` files, `node_modules`, or `/client/dist` — verify `.gitignore` covers these before first commit.
- Do not silently skip a task in `todo.md` — if you can't complete something (missing credential, unclear requirement), stop and ask.
- Do not invent product data, pricing, or business details not specified in `prd.md` — ask, or use clearly-marked placeholder data.
- Do not copy layout, color palette, or copy text directly from `/design-reference/` or from any external reference site — those are for structural/content/functional reference only, never visual reference.
- Do not build a pizza/food-themed app, copy, or data model anywhere in this project — the domain is furniture/interior goods, full stop.
- Do not add authentication "shortcuts" (e.g. skip password hashing "for now") — build it correctly from the start.

---

## 11. Definition of Done (per feature)

A feature is done when: it works end-to-end (not just UI mockup), it has no console errors/warnings, it's responsive (mobile + desktop), it degrades gracefully without JS-heavy animation on reduced-motion, it matches the relevant `testing.md` checklist, and `todo.md` is updated to reflect its status.

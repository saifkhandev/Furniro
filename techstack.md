# techstack.md — Approved Tech Stack

This is the **exhaustive, authoritative list** of what may be used in this project. If something isn't listed here and isn't clearly a Node.js/browser built-in, do not install it — ask first, and add it here once approved. This file exists so the agent never has to guess or default to "whatever's popular this month."

---

## 1. Monorepo Layout

Two npm workspaces, no shared build tool needed between them:
- `/client` — Vite + React app
- `/server` — Node + Express app

Package manager: **npm only**. Do not generate `yarn.lock` or `pnpm-lock.yaml`.

---

## 2. Frontend

| Purpose | Choice | Notes |
|---|---|---|
| Build tool | **Vite** | React template (`npm create vite@latest -- --template react`) |
| UI library | **React 18** | Functional components + hooks only |
| Routing | **React Router v6** | |
| Styling | **Tailwind CSS** | Utility-first; custom design tokens (colors, spacing, type scale) defined in `tailwind.config.js`, not ad hoc |
| Animation (general/UI) | **Framer Motion** | Page transitions, component enter/exit, micro-interactions |
| Animation (scroll/timeline) | **GSAP** + **ScrollTrigger** plugin | Complex scroll-driven sequences, pinning, staggered reveals |
| Smooth scroll | **Lenis** | Wraps the page for buttery scroll that GSAP ScrollTrigger syncs against |
| 3D | **Three.js** via **React Three Fiber** + **@react-three/drei** | Hero 3D scene / interactive product view |
| Client state | **Zustand** | Cart, auth session, UI state — no Redux, no Context-for-everything |
| Server state / data fetching | **TanStack Query (React Query)** | API calls, caching, loading/error states |
| Forms | **React Hook Form** + **Zod** (via `@hookform/resolvers`) | Form state + schema validation |
| HTTP client | **Axios** | Centralized instance in `/client/src/lib/api.js` with interceptors for auth token refresh |
| Icons | **lucide-react** | |
| Real-time client | **socket.io-client** | Subscribes to order status updates |
| Payments (client) | **Razorpay Checkout.js** (loaded via script tag / `razorpay` npm helper if needed) | Test mode only |
| Meta/SEO tags | **react-helmet-async** | |
| Toasts/notifications | **sonner** or **react-hot-toast** (pick one, stay consistent) | |

**Not allowed on the frontend** unless explicitly approved later: Redux/Redux Toolkit, styled-components/Emotion (Tailwind is the styling system), Next.js (this is a Vite SPA, not a framework migration), jQuery, Bootstrap/MUI/Chakra (no competing component/design systems), any TypeScript conversion.

---

## 3. Backend

| Purpose | Choice | Notes |
|---|---|---|
| Runtime | **Node.js** (LTS) | |
| Framework | **Express.js** | |
| Database | **MongoDB** (Atlas free tier, M0) | |
| ODM | **Mongoose** | Schema-first models |
| Auth | **jsonwebtoken** + **bcrypt** | Access + refresh token pattern |
| Validation | **Zod** or **express-validator** (pick one, stay consistent) | Server-side validation on every mutating route — never trust client validation alone |
| Email | **Nodemailer** | Gmail app password or Ethereal (dev/test) as transport |
| Scheduled jobs | **node-cron** | Low-stock check job |
| Real-time | **socket.io** | Order status broadcast |
| Payments (server) | **razorpay** (official Node SDK) | Test mode keys only |
| File/image handling | **multer** (if local upload needed) or direct client upload to a free image host — decide in `todo.md` when the relevant task is reached | |
| CORS | **cors** middleware | Restrict to `CLIENT_URL` in production config |
| Env management | **dotenv** | |
| Logging (dev) | **morgan** | Request logging in development only |
| Security headers | **helmet** | |
| Rate limiting | **express-rate-limit** | Applied at minimum to auth routes |

**Not allowed on the backend** unless explicitly approved later: GraphQL (REST only for this project), a second database (no Redis/Postgres alongside Mongo unless a specific need is identified and approved), Passport.js (JWT is implemented directly — no need for the extra abstraction at this scale), microservices split (single Express app for this project).

---

## 4. Testing

See `testing.md` for the full policy. Tooling allowed:
- **Vitest** (frontend unit/component tests, pairs naturally with Vite)
- **React Testing Library** (component tests)
- **Jest** or **Vitest** (backend unit tests — pick one, stay consistent with frontend choice if reasonable)
- **Supertest** (backend API integration tests)
- **Postman/Thunder Client** (manual API exploration — not part of the automated suite)

---

## 5. Tooling & Dev Experience

| Purpose | Choice |
|---|---|
| Linting | ESLint (React + hooks plugin recommended configs) |
| Formatting | Prettier |
| Git hooks (optional, only if it doesn't slow the human down) | Husky + lint-staged |
| API testing during dev | Thunder Client / Postman |

---

## 6. Explicitly Deferred / Not Needed for v1

These may come up as ideas but are out of scope unless `prd.md` is updated first:
- TypeScript migration
- Server-side rendering / Next.js migration
- Native mobile app
- CI/CD pipeline automation (fine to add later, not blocking core build)
- Docker containerization (nice-to-have, not required for local dev or the deliverable)

---

## 7. Version Policy

Use the latest stable major version of each package at project start; do not chase bleeding-edge/beta releases mid-project. Once a major version is chosen and the project has meaningful code built against it, do not upgrade it mid-build without a specific reason (breaking bug, missing needed feature) — flag any such upgrade to the human before doing it.

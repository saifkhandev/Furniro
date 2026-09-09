# todo.md — Implementation Plan

Work through this **top to bottom, one phase at a time**. Do not start a later phase until the current one's tasks are checked off and working. Check off each task (`[x]`) as you complete and verify it — not before. If a task is bigger than it looked, split it into sub-bullets in place rather than marking it done early.

Cross-reference `testing.md` before checking off any task marked **(test)**.

---

## Phase 0 — Project Setup

- [ ] Initialize `/client` with Vite + React
- [ ] Initialize `/server` with Express, basic `server.js`, health-check route (`GET /api/health`)
- [ ] Set up `.gitignore` (node_modules, .env, dist, .DS_Store)
- [ ] Create `.env.example` for both client and server per `CLAUDE.md` section 5
- [ ] Install and configure Tailwind CSS in `/client`
- [ ] Install ESLint + Prettier in both workspaces, agree on shared config
- [ ] Set up MongoDB Atlas cluster (free tier) and confirm connection from `/server` (log "MongoDB connected")
- [ ] Confirm both dev servers run concurrently without conflict (document ports in README)
- [ ] Initial commit

## Phase 1 — Backend Foundations

- [x] Define Mongoose schemas: `User`, `Product`, `Category`, `Order`, `ContactMessage` (fields per `prd.md` feature list)
- [x] Set up centralized error-handling middleware
- [x] Set up request validation middleware (Zod or express-validator, per `techstack.md`)
- [x] Set up `helmet`, `cors` (restricted to `CLIENT_URL`), `morgan` (dev only)
- [x] Set up basic rate limiting on auth routes
- [x] **(test)** Confirm server starts cleanly, all middleware loads without error

## Phase 2 — Authentication

- [ ] User registration endpoint: hash password (bcrypt), create user as unverified, send verification email (Nodemailer)
- [ ] Email verification endpoint (token-based)
- [ ] Login endpoint: issue JWT access + refresh tokens
- [ ] Refresh token endpoint
- [ ] Forgot password endpoint: generate expiring reset token, send reset email
- [ ] Reset password endpoint
- [ ] Auth middleware (`protect`) for guarded routes
- [ ] Separate admin login endpoint/flow (not reachable from public registration)
- [ ] Frontend: Register page/form (React Hook Form + Zod validation)
- [ ] Frontend: Login page/form
- [ ] Frontend: Forgot/reset password pages
- [ ] Frontend: Zustand auth store (user, tokens, login/logout actions), Axios interceptor for token refresh
- [ ] Frontend: protected route wrapper for logged-in-only pages
- [ ] **(test)** Full register → verify → login → protected route → logout cycle works manually end to end

## Phase 3 — Product Catalog (Backend)

- [ ] Category CRUD endpoints (admin-only for write)
- [ ] Product CRUD endpoints (admin-only for write), including variant/customization option fields (material, finish, size, stock per variant where applicable)
- [ ] Public product listing endpoint: pagination, filter (category, price range, material), sort
- [ ] Public single-product endpoint
- [ ] Seed script: realistic placeholder furniture products across categories (enough to populate a convincing catalog — aim for 20–30+ products across at least 4 categories)
- [ ] **(test)** Seed runs cleanly, listing/filter/sort endpoints return expected shapes

## Phase 4 — Frontend Foundation & Design System

- [ ] Define Tailwind design tokens (palette, type scale, spacing) per `prd.md` art direction — do this once, don't improvise per-page later
- [ ] Set up React Router structure (all routes stubbed with placeholder pages)
- [ ] Build shared layout: header/nav (with cart icon + auth state), footer
- [ ] Set up Zustand cart store (client-only state at this stage)
- [ ] Set up TanStack Query provider + Axios base client
- [ ] Set up Lenis smooth scroll wrapper at app root
- [ ] Set up GSAP + ScrollTrigger registration at app root
- [ ] Set up `react-helmet-async` provider for page titles/meta

## Phase 5 — Home Page

- [ ] Hero section with primary animated/3D element (React Three Fiber scene or equivalent signature visual)
- [ ] Category showcase section (scroll-reveal animated)
- [ ] Featured products section (pulls from real API data, not hardcoded)
- [ ] Inspiration/lifestyle section (scroll-driven, reference kit's "50+ beautiful rooms" section reskinned — original design)
- [ ] Footer content (links, newsletter signup UI — functional or stubbed, confirm with human which)
- [ ] **(test)** Reduced-motion fallback verified; mobile layout verified; Lighthouse performance sanity check

## Phase 6 — Shop / Catalog Page

- [ ] Product grid connected to real API (pagination)
- [ ] Filter sidebar/drawer (category, price, material) wired to API query params
- [ ] Sort control wired to API
- [ ] Product card component (image, name, price, quick-add or link to detail) with entrance animation
- [ ] Empty-state and loading-state handling
- [ ] **(test)** Filtering/sorting/pagination all produce correct results; mobile filter drawer works

## Phase 7 — Product Detail & Customization

- [ ] Product detail layout: image gallery, price, description, stock status
- [ ] Multi-step customization configurator (material → finish → size → add-ons) per `prd.md` 4.1, with live price update as options change
- [ ] "Add to cart" wired to cart store, including selected customization data
- [ ] Related products section
- [ ] **(test)** Every customization path produces a correctly-shaped cart item; out-of-stock states handled

## Phase 8 — Cart

- [ ] Mini-cart sidebar (slide-in, matches reference kit's "Cart Sidebar" concept but original design)
- [ ] Full cart page: update quantity, remove item, subtotal calculation
- [ ] Cart persistence (localStorage or backend-synced cart for logged-in users — decide and document choice)
- [ ] **(test)** Cart math correct across add/remove/update-quantity sequences, including customized items with different prices

## Phase 9 — Checkout & Payment

- [ ] Checkout page: shipping address form (validated), order summary
- [ ] Backend: create-order endpoint (creates Order in `pending` state, decremented stock only on confirmed payment — decide and document the exact stock-decrement timing)
- [ ] Razorpay integration: backend order creation call, frontend Checkout.js flow, signature verification on payment success (server-side)
- [ ] Order confirmation page on success; graceful handling of payment failure/cancellation
- [ ] **(test)** Full checkout completes in Razorpay test mode with a test card/UPI; failed/cancelled payment doesn't create a false "paid" order

## Phase 10 — Order Tracking & Real-Time

- [ ] Order history page (logged-in user, lists past orders + statuses)
- [ ] Order detail/tracking view with visual status stepper (Order Placed → Confirmed → Packing → Out for Delivery → Delivered)
- [ ] Socket.io server setup, room-per-user or room-per-order pattern
- [ ] Socket.io client: subscribe to relevant order updates, update UI live without refresh
- [ ] **(test)** Status change made from admin panel reflects on an open user tracking view within a couple seconds, no refresh needed

## Phase 11 — Admin Panel

- [ ] Admin-only route guard (role check, not just "logged in")
- [ ] Inventory dashboard: list all products/variants with current stock, manual stock-edit control
- [ ] Order management panel: list all orders, filter by status, update status action (triggers Socket.io emit)
- [ ] Contact message inbox view
- [ ] **(test)** A non-admin user cannot reach any admin route or call any admin-only endpoint (verify both UI-level and API-level)

## Phase 12 — Automated Low-Stock Alerts

- [ ] Configurable stock threshold per product (or a global default)
- [ ] node-cron job: runs on a schedule, queries products below threshold
- [ ] Sends a single summary email to admin listing all low-stock items (not one email per item)
- [ ] **(test)** Manually trigger the job function directly (not just waiting for the schedule) and confirm the email arrives with correct data

## Phase 13 — Secondary Pages

- [ ] Contact page (form → stores message via API)
- [ ] Blog/Inspiration listing + post page (seeded content, per `prd.md` stretch scope)
- [ ] Product Comparison page (stretch, per `prd.md`)
- [ ] Wishlist (stretch, per `prd.md`)

## Phase 14 — Polish Pass

- [ ] Full responsive audit across all pages (mobile, tablet, desktop)
- [ ] Full `prefers-reduced-motion` audit across all animated/3D sections
- [ ] Performance pass: image optimization, lazy loading, 3D asset loading states, bundle size sanity check
- [ ] Accessibility pass: keyboard navigation, focus states, alt text, form labels, color contrast
- [ ] Cross-browser sanity check (Chrome, Firefox, Safari at minimum)

## Phase 15 — Testing Pass

- [ ] Execute full checklist in `testing.md`
- [ ] Fix any failures found before proceeding

## Phase 16 — Documentation & Submission Prep

- [ ] Write project README: setup instructions, env vars needed, how to run, feature list, screenshots
- [ ] Record/prepare any demo materials needed
- [ ] Final review of `todo.md` — confirm every task is genuinely checked off, not just visually skimmed

---

## Notes for the Agent

- If you finish a phase and realize an earlier phase needs a fix because of something learned later, fix it and note it here rather than patching around it downstream.
- Always tell the human when you're moving from one phase to the next.
- If blocked on a missing credential/decision (e.g. Razorpay keys, final brand name, image hosting choice), stop and ask rather than guessing or stubbing around it silently.

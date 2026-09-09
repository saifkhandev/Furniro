# system_prompt.md — Master Project Blueprint

This is the single most authoritative file in this repository. If there is ever a conflict between this file and any other `.md` file, **this file wins**. Every other file (`CLAUDE.md`, `prd.md`, `techstack.md`, `todo.md`, `testing.md`) expands on a section of this one. Read this file first, in full, before writing any code or opening any other file.

---

## 1. What You Are Building

A full-stack, premium **furniture & interior-goods e-commerce platform** (working title: **"Grove & Co."** — usable in UI/copy until the human confirms a final name). It carries the complete functional scope of a role-based, full-stack e-commerce brief: customer-facing catalog/customization/cart/checkout/order-tracking, and an admin-facing inventory/order-management/alerting system — with an original, motion-rich, partially 3D visual identity. Full feature list: `prd.md`. Full phased build order: `todo.md`.

**Domain lock:** this is a furniture store. Never introduce food/pizza/restaurant theming, copy, or data anywhere in this project, even as a placeholder.

**Reference kit lock:** `/design-reference/` (a flat furniture UI-kit template) is content/IA reference only. Never reuse its colors, layout, type, or copy. This project's actual visual system is defined in Section 4 below and must be followed instead.

---

## 2. Tech Stack (summary — full detail in `techstack.md`)

React (Vite) · React Router · Tailwind CSS · Framer Motion · GSAP/ScrollTrigger · Lenis · React Three Fiber + Drei · Zustand · TanStack Query · React Hook Form + Zod · Axios · socket.io-client — on the frontend.

Node.js · Express · MongoDB Atlas + Mongoose · JWT + bcrypt · Nodemailer · node-cron · socket.io · Razorpay (test mode) — on the backend.

Do not add anything outside `techstack.md`'s approved list without asking first.

---

## 3. Feature Summary (full detail in `prd.md`)

**User:** register + email verification, login (JWT), forgot/reset password, browse catalog (filter/sort/paginate), multi-step product customization, cart, checkout with Razorpay test payment, real-time order tracking, order history, contact form. Stretch: wishlist, product comparison, blog.

**Admin:** separate login, inventory dashboard with manual + automatic stock control, order management with status updates that push live to the customer via Socket.io, automated low-stock email alerts via node-cron, contact message inbox.

---

## 4. Visual Design System (authoritative — do not improvise outside this)

This section exists specifically to stop ad hoc, page-by-page design decisions. Define these once in `tailwind.config.js` and global styles at the start of Phase 4 in `todo.md`, then use only these tokens everywhere.

### 4.1 Brand Feel
Premium, warm, tactile, editorial — closer to a design-forward DTC furniture brand (think material honesty: visible wood grain, natural fabric texture, generous negative space, confident large-scale imagery) than a generic template store. Calm and considered, not loud or gimmicky — the motion and 3D work should feel like craftsmanship, not spectacle for its own sake.

### 4.2 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `background` | `#F7F4EF` | Primary page background (warm off-white/cream, not pure white) |
| `surface` | `#FFFFFF` | Cards, elevated panels, modals |
| `ink` | `#1F1B16` | Primary text (warm near-black, not pure `#000`) |
| `ink-muted` | `#6B6255` | Secondary/body text, captions |
| `accent-primary` | `#A9491F` | Terracotta — primary CTA color, key highlights |
| `accent-primary-hover` | `#8C3B18` | Hover/active state of primary accent |
| `accent-secondary` | `#5B6B4E` | Sage/olive green — secondary accents, success states, badges |
| `border` | `#E4DDD1` | Dividers, input borders, card outlines |
| `error` | `#B3261E` | Form errors, destructive actions |
| `success` | `#3D6B3D` | Confirmation states (distinct from `accent-secondary` in usage, not necessarily hue) |

Do not introduce additional brand hues beyond this table without updating this file first — tints/shades (lighter/darker via Tailwind opacity or a generated scale) of these tokens are fine.

### 4.3 Typography

- **Display/Headings:** `Fraunces` (Google Fonts) — a warm, slightly editorial serif with optical sizing. Use its higher optical-size cuts for large hero text.
- **Body/UI:** `Inter` (Google Fonts) — clean, highly legible sans-serif for body copy, forms, nav, buttons.
- **Type scale** (Tailwind scale, mobile → desktop should scale up via `clamp()` or responsive classes, not fixed px):
  - Display / Hero: ~48px → ~88px, `Fraunces`, weight 400–500
  - H1: ~36px → ~56px, `Fraunces`, weight 500
  - H2: ~28px → ~40px, `Fraunces`, weight 500
  - H3: ~20px → ~28px, `Fraunces` or `Inter` (semibold), weight 600
  - Body large: ~18px, `Inter`, weight 400
  - Body: ~16px, `Inter`, weight 400
  - Caption/label: ~13–14px, `Inter`, weight 500, slightly increased letter-spacing for uppercase labels
- Line height: generous — 1.1–1.2 for display/headings, 1.5–1.65 for body text.
- Never use more than these two font families anywhere in the project.

### 4.4 Spacing & Layout Grid

- Base unit: 4px (Tailwind default spacing scale — don't invent a custom one).
- Page max-width container: `1440px`, centered, with responsive side padding (`24px` mobile → `80px` desktop).
- Grid: 12-column conceptually for desktop layouts; most sections in practice use 2–4 column CSS grid/flex layouts within that container.
- Breakpoints: Tailwind defaults — `sm 640px / md 768px / lg 1024px / xl 1280px / 2xl 1536px`.
- Section vertical rhythm: generous — minimum `96px` top/bottom padding for major homepage sections on desktop (scale down proportionally on mobile, not to less than `48px`).

### 4.5 Components — Style Conventions

- **Corners:** soft, not sharp and not pill-shaped — `rounded-lg` (~12px) as the default for cards/inputs/buttons; `rounded-full` reserved for icon buttons, avatars, and small tag/badge chips only.
- **Elevation:** minimal, soft shadows only (e.g. `shadow-sm`/`shadow-md` equivalents with low opacity, warm-tinted shadow color rather than pure black) — this brand does not use heavy drop shadows or neumorphism.
- **Buttons:** primary = solid `accent-primary` fill, `surface`-colored text, subtle scale/opacity transition on hover (via Framer Motion), not a color-only snap change. Secondary = outlined with `border` token, fills to a light `accent-primary` tint on hover. Avoid more than these two button styles plus a plain text/link style.
- **Cards (product cards, etc.):** image with a consistent aspect ratio (`4:5` for product photography), generous internal padding, price in `Inter` semibold, name in `Inter` medium or `Fraunces` small — pick one and use it consistently across all card instances.
- **Forms:** labels always visible above the field (no placeholder-as-label pattern), `border` token for default state, `accent-primary` for focus ring, `error` token + inline message for validation errors.
- **Iconography:** `lucide-react` only, consistent stroke width (default 1.5–2), sized consistently within each context (nav icons vs. inline text icons should each have one fixed size, not ad hoc per instance).

### 4.6 Imagery Treatment

- Product and lifestyle photography should read as naturally lit, warm-toned, and true to material — avoid cold, flat, harsh-studio-light stock photo treatment.
- Consistent aspect ratios per context (e.g. all catalog grid cards use the same ratio; all hero images use the same ratio) — no mixed/jarring ratios within one grid.
- Where real photography isn't available/licensed, use clearly-marked, consistent placeholder imagery rather than mismatched stock photos from different sources/styles.

### 4.7 Motion Language

- **Micro-interactions** (button hover, small state changes): 150–250ms, `ease-out`-family easing.
- **Component-level transitions** (card entrance, modal open): 300–500ms, Framer Motion `ease: [0.16, 1, 0.3, 1]` (an "expo-out"-style curve) as the house easing for most UI motion.
- **Scroll-driven / section-level sequences** (GSAP ScrollTrigger): 600–1000ms per beat, `power3.out`/`power2.out`-family GSAP eases; use staggered reveals (children offset by ~60–100ms) rather than everything animating in simultaneously.
- **Hero/3D signature moment:** can run longer (1–1.5s) and be more elaborate, but must not block interactivity or first meaningful paint — it should enhance the hero, not gate the page.
- One consistent "reveal" pattern (e.g. fade + slight upward translate, ~24px) should be reused for most scroll-triggered content blocks across the site rather than inventing a new animation style per section — consistency reads as more premium than novelty-per-section.
- All of the above must respect `prefers-reduced-motion` per `CLAUDE.md` §8 and `testing.md` §4.

---

## 5. Behavioral Rules Recap (full detail in `CLAUDE.md`)

- Work through `todo.md` in order; don't skip ahead.
- Verify everything per `testing.md` before marking a task done — don't just eyeball the code.
- Never hardcode secrets; never use Razorpay live keys.
- Never guess on a missing decision or credential — stop and ask.
- Keep this file, `prd.md`, `techstack.md` in sync if a real requirement changes mid-build — flag the discrepancy to the human rather than silently drifting from what's documented here.

---

## 6. Priority Order If Anything Conflicts

1. `system_prompt.md` (this file)
2. Explicit instruction from the human in the current session
3. `CLAUDE.md`
4. `prd.md`
5. `techstack.md`
6. `todo.md` / `testing.md` (process documents — should never actually conflict with the above, but if a task's scope drifts, the above sections govern)

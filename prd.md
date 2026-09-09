# prd.md — Product Requirements Document

## 1. What This Is

A full-stack, premium furniture & interior-goods e-commerce platform. Customers browse and customize furniture (materials, finishes, sizes), buy it through a real checkout flow (test-mode payments), and track their order in real time. Store owners (admin) manage inventory, fulfil orders, and get automated alerts when stock runs low.

This is **not** a template clone of the reference kit (`/design-reference/`) — that kit exists only to show what *content and structure* this kind of store typically needs (product cards, cart, checkout form fields, etc). The actual design, brand identity, and page layouts for this project are original and far more animated/3D — see Section 6.

**Working brand name:** placeholder `"Grove & Co."` — the agent may use this as a working title in copy/UI until the human confirms a final name. Do not invent a *different* brand name without asking.

---

## 2. Purpose & Goals

- Build a real, working, full-stack e-commerce application — not a static mockup — covering the complete customer purchase journey and the complete admin fulfilment journey.
- Demonstrate the same functional depth as a full "pizza delivery" style brief (role-based auth, product customization flow, cart, real payment integration in test mode, real-time order status, inventory + automated stock alerts) — applied to furniture retail instead of food.
- Serve as a strong portfolio piece: the visual/motion design should feel like a premium studio or DTC (direct-to-consumer) furniture brand site, not a generic Bootstrap template.

---

## 3. Target Audience

- **Primary persona — "The Browsing Buyer":** Someone furnishing a home or a single room, comparing a handful of pieces, wants to see materials/finishes clearly before buying, cares about delivery timelines.
- **Secondary persona — "The Store Admin":** Small furniture business owner/operator who needs to track stock across SKUs, fulfil orders, and not run out of popular items without warning.

---

## 4. Feature Set

Every feature below is the furniture-domain equivalent of a corresponding requirement in the pizza-delivery-style functional brief this project is scoped against. Nothing here should be skipped for being "too much" — trim scope by asking, not by silently dropping a feature.

### 4.1 User-Side Features

| Feature | Detail |
|---|---|
| Registration | Email + password, with email verification step before full account activation |
| Login | JWT-based (access + refresh token), "remember me" optional |
| Forgot password | Email reset-link flow, expiring token |
| Product catalog | Browse by category (e.g. Living Room, Bedroom, Dining, Lighting, Decor), filter by price/material/color, sort, pagination |
| Product detail page | Image gallery, price, description, stock status, materials/dimensions, reviews (optional stretch) |
| Product customization flow | Multi-step configurator on eligible products (e.g. sofas, tables): Step 1 choose material (wood/fabric/metal), Step 2 choose finish/color, Step 3 choose size/dimensions, Step 4 choose add-ons (e.g. cushions, legs style) — mirrors a "build your own" flow, reskinned for furniture |
| Cart | Add/remove/update quantity, persistent across session, mini-cart sidebar + full cart page |
| Order summary | Reviewed before payment: items, customizations, subtotal, shipping estimate, taxes |
| Checkout & payment | Address form, Razorpay checkout integration (test mode) — "Success" confirms the order |
| Order tracking | Real-time status on user dashboard: **Order Placed → Confirmed → In Production/Packing → Out for Delivery → Delivered** |
| Order history | List of past orders with status and re-order option |
| Wishlist (stretch) | Save products for later |
| Product comparison (stretch) | Side-by-side comparison of 2–3 products, matches the reference kit's "Product Comparison" page |
| Blog / Inspiration (stretch) | Editorial-style content pages (room inspiration, styling guides) — matches the reference kit's "Blog" page, reskinned |
| Contact page | Contact form (stores message server-side; admin can view it) |

### 4.2 Admin-Side Features

| Feature | Detail |
|---|---|
| Admin login | Separate from user registration/login flow entirely — not reachable from the public signup form |
| Inventory dashboard | Current stock per product/SKU (including per-variant stock where customization affects stock, e.g. per color/material) |
| Stock auto-decrement | Stock reduces automatically when an order is placed |
| Manual stock update | Admin can adjust stock counts directly |
| Low-stock alerts | Automated email to admin when any item's stock drops below a configurable threshold — implemented via a scheduled job (node-cron) |
| Order management panel | View all incoming orders, update status per order |
| Real-time status sync | Status changes made by admin reflect on the user's order tracking view in real time (Socket.io) |
| Contact message inbox | Admin can view messages submitted via the public Contact form |

### 4.3 Non-Functional Requirements

- **Responsive:** full functionality and (adapted) animation on mobile, tablet, and desktop.
- **Performance:** initial page load should not be blocked by 3D asset loading; target smooth 60fps scroll/animation on a mid-range laptop; images optimized/lazy-loaded.
- **Accessibility:** semantic HTML, keyboard-navigable forms and nav, `prefers-reduced-motion` respected for all major animations, sufficient color contrast.
- **Security:** hashed passwords (bcrypt), JWT expiry + refresh flow, input validation/sanitization on all server endpoints, no secrets in client bundle.
- **SEO basics:** meaningful page titles/meta descriptions, semantic heading structure, server-rendered-friendly routing where feasible (or at least proper `<title>`/meta management via a library like `react-helmet-async`).

---

## 5. Core User Flows

### 5.1 New customer purchase flow
1. Lands on Home → browses catalog or a featured product from Home.
2. Opens a product detail page → (if customizable) goes through the multi-step configurator.
3. Adds to cart → sees mini-cart confirmation.
4. Continues browsing or goes to Cart page → reviews items/quantities.
5. Proceeds to Checkout → registers/logs in if not already authenticated → fills shipping address.
6. Reviews Order Summary → proceeds to payment (Razorpay test mode).
7. On payment success → order confirmation page → order now visible in Order History with live status.
8. Watches order status update in real time as admin processes it.

### 5.2 Returning customer flow
1. Logs in → optionally goes straight to Order History to track an existing order, or continues shopping.

### 5.3 Forgot password flow
1. Clicks "Forgot password" on login → enters email → receives reset link → sets new password → redirected to login.

### 5.4 Admin fulfilment flow
1. Admin logs in via separate admin login route.
2. Views Order Management panel → sees new orders → updates status as the order is fulfilled.
3. Each status update instantly reflects on the relevant customer's order tracking view.
4. Views Inventory Dashboard → manually adjusts stock as needed, or reacts to a low-stock email alert triggered automatically by the node-cron job.

### 5.5 Low-stock alert flow (automated, no user action)
1. Scheduled job runs periodically → checks stock levels against configured threshold per product.
2. If any product is below threshold → sends an email to the admin address listing the affected products.

---

## 6. Design & Art Direction

- **Tone:** premium, warm, tactile — materials and craftsmanship should feel emphasized (wood grain, fabric texture, natural light), not sterile/corporate.
- **Motion identity:** scroll-driven reveals, smooth page/section transitions, subtle parallax, and at least one meaningful 3D element (e.g. a rotatable/interactive 3D hero product, or a 3D scene in the hero section) — inspired in *spirit* (motion quality, confidence, use of space) by modern agency-style sites, but with fully original layout, palette, and typography.
- **Never** reuse the reference kit's (`/design-reference/`) visual design, color palette, component styling, or copy text — it is a structural/content reference only, as stated in `CLAUDE.md`.
- Full visual system (palette, type scale, spacing, component library conventions) should be defined once, early, and referenced consistently — not decided ad hoc per page.

---

## 7. Out of Scope (for this phase)

- Multi-currency / multi-language support
- Third-party marketplace integrations (Amazon, Etsy, etc.)
- Native mobile apps
- Live (non-test-mode) payments
- Full CMS for blog content (hard-coded/seeded blog content is fine)

---

## 8. Definition of Done (product-level)

The product is done when a first-time visitor can discover a product, customize it, buy it with a test payment, and watch its status change in real time — and an admin can independently manage stock, fulfil that same order, and receive an automated alert if inventory runs low — all without any manual database editing or developer intervention.

# testing.md — Testing & Self-Audit Policy

This file defines how the agent must verify its own work. "It compiles" is not a pass condition. Every task in `todo.md` marked **(test)** — and really, every task in general — must clear the relevant checks below before being marked done.

---

## 1. Core Principle

The agent must **run and observe** things, not just write code and assume it works. Where a tool is available to actually execute the app, hit an endpoint, or run a test suite, use it. Never mark a task complete based on reading the code and reasoning "this should work."

---

## 2. Baseline Checks (every single task, no exceptions)

Before marking *any* task in `todo.md` as done:

- [ ] The relevant dev server(s) start with no errors in the terminal
- [ ] The browser console has zero errors and zero new warnings introduced by this change
- [ ] `npm run lint` passes in the affected workspace (fix warnings too, not just errors, unless there's a documented reason not to)
- [ ] No leftover `console.log` debugging statements committed (temporary ones used while building are fine — remove before marking done)
- [ ] The feature was actually exercised in the browser/API client — clicked through, form submitted, endpoint called — not just visually inspected

---

## 3. Backend-Specific Checks

For any new or changed API endpoint:

- [ ] Happy path tested with a real request (via Supertest, Thunder Client, or curl) and a real response inspected
- [ ] At least one failure path tested (missing field, invalid data, unauthorized access) and confirmed it returns an appropriate status code + error shape, not a 500 or a silent success
- [ ] Auth-guarded routes: confirmed an unauthenticated request is rejected (401), and where relevant, confirmed a non-admin request to an admin route is rejected (403)
- [ ] Input validation confirmed on the server side even if the client also validates — never trust the client alone
- [ ] Any endpoint that touches stock/inventory: confirmed it doesn't allow stock to go negative, and confirmed concurrent-order behavior is at least reasonable (document known limitations if full race-condition handling is out of scope for this project)
- [ ] Database writes checked directly (via a query or Atlas UI) at least once per new model/field to confirm the actual stored shape matches expectations, not just the API response shape

## 4. Frontend-Specific Checks

For any new or changed page/component:

- [ ] Loading state, error state, and empty state all manually triggered and visually confirmed (not just the happy path with data present)
- [ ] Responsive check at minimum three breakpoints: mobile (~375px), tablet (~768px), desktop (~1440px)
- [ ] Keyboard navigation: can tab through interactive elements in a sensible order; focus states are visible
- [ ] Forms: validation errors display clearly, submit button disabled/loading during submission, success/failure feedback shown
- [ ] Any animation/3D element: confirmed it still degrades sensibly with `prefers-reduced-motion: reduce` simulated (browser devtools can emulate this)
- [ ] Any animation/3D element: confirmed no layout shift or blocked interaction while it loads

## 5. Auth & Security Checks

Run these explicitly at the end of Phase 2 (auth), and again as a full re-check at Phase 15:

- [ ] Cannot register with an already-used email
- [ ] Cannot log in with wrong password / non-existent email (and error messages don't reveal which one was wrong)
- [ ] Expired/invalid JWT is rejected, not silently accepted
- [ ] Refresh token flow actually issues a new valid access token
- [ ] Password reset tokens expire and cannot be reused after use
- [ ] Admin routes are unreachable both via UI (no visible admin nav/links for non-admins) and via direct API call with a non-admin token
- [ ] No secret keys (JWT secrets, Razorpay secret key, email password) appear anywhere in client-side code or a browser network tab

## 6. Payment Flow Checks

- [ ] Successful test payment creates exactly one order, in the correct state, with correct stock effects
- [ ] Cancelled/failed payment does **not** create a confirmed order or decrement stock
- [ ] Payment signature verification happens server-side (never trust a client-reported "payment succeeded" without verifying with Razorpay)
- [ ] Refreshing or navigating away mid-checkout doesn't produce duplicate orders

## 7. Real-Time Checks

- [ ] Order status update made in the admin panel appears on an already-open user tracking view without a page refresh
- [ ] Socket connection handles a disconnect/reconnect (e.g. brief network drop) gracefully — no crash, reconnects and resumes receiving updates

## 8. Automated Test Coverage (minimum bar)

Per `techstack.md`'s testing tools. This project does not need exhaustive coverage, but these must exist:

- [ ] Backend: unit or integration tests for auth (register/login/protected route rejection) and for the order-creation + stock-decrement logic (the two areas most likely to have subtle bugs)
- [ ] Frontend: component tests for the cart logic (add/remove/update quantity math) and for the product customization price calculation
- [ ] `npm run test` passes cleanly in both workspaces before any phase is considered fully closed

## 9. Cross-Cutting Regression Check

After completing each phase in `todo.md` (not just each task):

- [ ] Spot-check 2–3 features from *previous* phases still work — new code shouldn't quietly break old functionality (e.g. adding the customization flow shouldn't break plain add-to-cart for non-customizable products)

## 10. Pre-Submission Full Audit (Phase 15)

Run the entire checklist above in one pass, plus:

- [ ] Full user journey walked start to finish in one continuous session: register → verify → browse → customize → cart → checkout → pay (test mode) → track order to delivered
- [ ] Full admin journey walked start to finish: admin login → view new order → update its status → confirm user side saw it live → adjust stock → confirm low-stock email logic works when manually triggered
- [ ] Fresh clone/install check: delete `node_modules` in both workspaces, reinstall from `package.json` alone, confirm the app still runs — catches any "works on my machine because of a stray global install" issue
- [ ] All `.env.example` files reviewed and confirmed accurate against what the app actually reads from `process.env` / `import.meta.env`

---

## 11. What To Do When Something Fails

- Do not mark the task done and move on "to come back to it later" — fix it first, or explicitly flag it to the human with what's broken and why you're pausing.
- Log the failure and fix in the relevant `todo.md` task as a note if it revealed a design gap worth remembering (e.g. "stock decrement needed to move from order-creation to payment-confirmation — fixed in Phase 9").
- If a failure reveals that an earlier `testing.md` check was insufficient to have caught it, add a new check here so it's caught earlier next time.

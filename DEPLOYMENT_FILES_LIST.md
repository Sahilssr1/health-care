# Bihar Healthcare Conclave 2026 - Razorpay Payment Integration Files

This document lists all files created and modified for the workshop registration Razorpay payment integration, along with the exact deployment commands for the live VPS server.

---

## 1. Files to Upload via FileZilla

Upload these files from your local directory:
`C:\Users\Sahil\OneDrive\Desktop\Work\bihar-healthcare\source\`

To your remote VPS directory:
`/opt/bhc2026/source/`

### A. New API Endpoints (Folder Creation in FileZilla)
In FileZilla inside `/opt/bhc2026/source/app/api`:
- Create folder `create-order` and upload its `route.ts`.
- Create folder `check-email` and upload its `route.ts`.
*(Or simply drag and drop the `create-order` and `check-email` folders from your local machine into `/opt/bhc2026/source/app/api`)*

1. `app/api/create-order/route.ts`
   - Purpose: Secure server-side Razorpay order creation endpoint. Checks for duplicate registered email before creating order.
2. `app/api/check-email/route.ts`
   - Purpose: Real-time duplicate email validation endpoint to warn users instantly on the form.

### B. Updated Backend Endpoints
3. `app/api/register/route.ts`
   - Purpose: Verifies Razorpay HMAC SHA-256 signatures, records transaction ID (`pay_...`) and fee into `specialisation`, and marks `registrationStatus` as `'paid'`.

### C. Updated Frontend Components & Styles
4. `components/register-form.tsx`
   - Purpose: Razorpay checkout integration, 11-tier fee matrix, instant duplicate email check, and free registration flow for non-workshops.
5. `app/workshop-selection.css`
   - Purpose: Custom UI styles for fee badges, workshop cards, and free registration indicators.
6. `app/confirmation/page.tsx`
   - Purpose: Displays payment receipt, fee paid, workshop name, and transaction ID on registration confirmation.
7. `components/newsletter-card.tsx`
   - Purpose: Modern floating newsletter subscription card with 3D healthcare illustration, sparkling micro-animations, email validation, and instant feedback.
8. `components/site-footer.tsx`
   - Purpose: Multi-column modern footer with company info, quick links, workshops, compliance/support, official contact details, social media icons, and WhatsApp quick chat.
9. `app/footer-modern.css`
   - Purpose: Responsive styling for modern floating newsletter card, glowing ambient orbs, 5-column layout, and sleek sub-footer bar.
10. `components/theme-toggle.tsx`
    - Purpose: Universal dark/light mode toggle with persistent localStorage syncing and smooth icon animation.
11. `components/site-navbar.tsx`
    - Purpose: Merged transparent/sticky dark & white navbar with horizontal desktop navigation, mobile hamburger drawer, and theme switcher.
12. `components/hero-editorial.tsx`
    - Purpose: Merged dark & white hero section tuned to logo colors (royal blue, emerald green, saffron amber), script kicker, headline with inline artwork capsule, and 5-partner showcase.
13. `app/hero-editorial.css`
    - Purpose: Complete responsive CSS for merged navbar (with unwanted line removed), theme system, and hero section.
14. `app/page.tsx`
    - Purpose: Integrates the merged hero with partners and removes the old announcement bar.

### D. Data & Validation Definitions
7. `lib/enhancement-data.ts`
   - Purpose: Defines dynamic Area of Interest options for Student, Employee, and Company, and master options list.
8. `lib/validation.ts`
   - Purpose: Validates registrations with the dynamic interest options.

### E. Security, Layout & Compliance Pages
9. `next.config.ts`
   - Purpose: Content Security Policy (CSP) headers allowing Razorpay scripts (`checkout.razorpay.com`), connections (`api.razorpay.com`), and checkout iframes.
10. `app/[slug]/page.tsx`
   - Purpose: Adds the Cancellation & Refund Policy (`/refund`) with official fee table and digital delivery notice (required for Razorpay website approval).
11. `app/layout.tsx`
   - Purpose: Preloads Razorpay script globally and adds the "Cancellation & Refund" link to the website footer.

### F. Environment Configuration
12. `.env`
    - Contains your Live Razorpay API credentials (example placeholders; keep actual keys only in server `.env`):
      ```env
      RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID
      RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_KEY_SECRET
      NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID
      ```

---

## 2. Quick File List Summary (Copy & Paste Reference)

```text
app/api/create-order/route.ts
app/api/check-email/route.ts
app/api/register/route.ts
components/register-form.tsx
components/newsletter-card.tsx
components/site-footer.tsx
components/theme-toggle.tsx
components/site-navbar.tsx
components/hero-editorial.tsx
lib/enhancement-data.ts
lib/validation.ts
app/workshop-selection.css
app/footer-modern.css
app/hero-editorial.css
app/confirmation/page.tsx
next.config.ts
app/[slug]/page.tsx
app/layout.tsx
app/page.tsx
.env
```

---

## 3. VPS Deployment Commands

Run these commands in your VPS SSH terminal after uploading the files via FileZilla:

```bash
# Step 1: Navigate to the application source directory
cd /opt/bhc2026/source

# Step 2: Build the Docker container with the new code
docker compose build --no-cache app

# Step 3: Start the updated container in detached mode
docker compose up -d app

# Step 4: Reconnect the app container to the proxy network
docker network connect --alias bhc2026-event-app novastay-network bhc2026-app-1
```

---

## 4. Switching to Live Mode (Once Razorpay Approves Website)

When `biharhealthcareconclave.com` shows **Approved** in Razorpay:
1. Switch toggle to **LIVE** in Razorpay dashboard.
2. Generate Live API Key (`rzp_live_...`).
3. Update `.env` on your VPS:
   ```env
   RAZORPAY_KEY_ID=rzp_live_...
   RAZORPAY_KEY_SECRET=...
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
   ```
4. Restart the app (takes 2 seconds, no full rebuild needed):
   ```bash
   docker compose restart app
   ```

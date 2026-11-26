# FINAL MASTER PROMPT — BIHAR HEALTHCARE CONCLAVE 2026

## ROLE & OBJECTIVE

Act as a Senior Full-Stack Engineer, UI/UX Designer, Database Architect, DevOps Engineer and Security Specialist.

Build and prepare a complete, production-ready website for **Bihar Healthcare Conclave 2026**.

**Priority: Launch the website today with fully functional FREE registration and an admin dashboard.**

Use the previously approved website prototype (`index.html`) as the visual reference. Preserve its premium design, colours, layout, typography and overall appearance. Do not redesign the website unnecessarily.

Read `CODEX_START_HERE.md` and `LAUNCH_COPY.md` before starting. These instructions override any older documents mentioning paid registration or sponsor registration.

---

## 1. OFFICIAL EVENT INFORMATION

**Event:** Bihar Healthcare Conclave 2026

**Date:** Friday, 11 December 2026

**Time:** 9:00 AM – 9:00 PM IST

**Venue:** Urja Auditorium, Patna, Bihar

**Theme:** Innovation • Quality • Skills • Technology • Excellence in Healthcare

**Tagline:** Building a Quality-Driven, Technology-Enabled & Future-Ready Healthcare Ecosystem.

**Motto:** Healthy Bihar | Healthier People | A Stronger India

**Organised by:** QualiNova Solutions Pvt. Ltd.

**Branding & Marketing Partner:** Spark Fusion Technologies Pvt. Ltd.

**Hospitality Partner:** NovaStay Hotels

**Contact:** info@qualinovahub.com

Never use the outdated event date of 12 December 2026.

---

## 2. WEBSITE DESIGN

Create a premium, modern, international healthcare summit website.

Use:
- White backgrounds with navy-blue and green accents
- Premium typography and professional spacing
- Healthcare, AI, medical innovation and Bihar-themed imagery
- Smooth animations and subtle interactive effects
- Responsive layouts for desktop, tablet and mobile
- Professional navigation and a strong registration CTA
- Optimised images and fast page loading

**Important:** Preserve the existing approved prototype design. Make only necessary improvements for responsiveness, functionality, accessibility and production readiness.

Do not generate or recreate official logos.

---

## 3. WEBSITE PAGES & SECTIONS

Build the following:

1. Homepage
2. About the Conclave
3. Vision and Five Pillars
4. Programme Highlights
5. Who Can Participate
6. Free Registration
7. Healthcare Excellence Awards
8. Nursing Knowledge Quest 2026
9. Healthcare Innovation Hackathon 2026
10. Healthcare and Technology Exhibition
11. Partnership Opportunities — Information Only
12. Organiser and Official Partners
13. Frequently Asked Questions
14. Contact
15. Privacy Policy and Terms
16. Registration Confirmation
17. Secure Admin Dashboard

Do not invent speakers, chief guests, government endorsements, confirmed sponsors, registration statistics or award winners.

---

## 4. FREE REGISTRATION SYSTEM

**Registration is currently completely FREE.**

Do not implement or display payment gateways, ticket prices, checkout screens, payment statuses or paid registration messages.

Registration form fields:

- Full Name
- Email Address
- Mobile Number
- City / District
- Participation Category
- Organisation / College / Institution
- Designation / Course
- Area of Interest (Optional)
- Privacy Consent

Participation categories:

- Doctor / Healthcare Professional
- Medical Student
- Nursing Student
- Engineering Student
- Pharmacy Student
- Paramedical Student
- Faculty / Educator
- Researcher / Startup
- Hospital / Institution Representative
- Healthcare Industry / HealthTech
- NGO / CSR
- Other

Engineering students must be included throughout the website, particularly in AI in Healthcare, HealthTech, Robotics, Medical Devices and the Healthcare Innovation Hackathon.

On successful registration:

1. Validate the form server-side.
2. Save the participant record to PostgreSQL.
3. Generate a unique registration reference.
4. Display a confirmation page.
5. Send a confirmation email when email delivery is configured.
6. Prevent accidental duplicate submissions.
7. Make the registration visible immediately in the admin dashboard.

Do not show a successful registration message unless the database transaction actually succeeds.

---

## 5. ADMIN DASHBOARD

Create a secure admin panel at `/admin`.

Admin functionality:

- Secure login and logout
- Total registrations
- Registrations by participant category
- Student registration statistics
- Medical and engineering student breakdown
- City-wise and institution-wise registration data
- Daily registration trends
- Search and filter participants
- View individual registration details
- CSV/Excel export
- Registration confirmation status
- Attendance tracking
- QR-based check-in, if implemented and securely verified
- Audit logs for important admin actions

Only authorised administrators should access registration records.

Protect participant personal information. Never expose registration databases or admin credentials publicly.

---

## 6. ORGANISER & PARTNER LOGOS

Create a prominent section titled:

**ORGANISER & OFFICIAL PARTNERS**

Display three separate partner identities:

**ORGANISED BY**  
QualiNova Solutions Pvt. Ltd.

**BRANDING & MARKETING PARTNER**  
Spark Fusion Technologies Pvt. Ltd.

**HOSPITALITY PARTNER**  
NovaStay Hotels

Use the exact original approved logo files supplied in the project.

Do not regenerate, redraw, recolour, crop, distort or approximate any logo.

Use consistent logo containers with `object-fit: contain`.

If a logo file is missing, reserve a clearly labelled space and request the original asset.

Display the organiser and partner identities prominently on the homepage and in the footer.

---

## 7. SPONSORSHIP & EXHIBITION

There must be **NO sponsor registration form**.

Keep a professional Partnership Opportunities section explaining potential collaborations.

Partnership CTA:

**Enquire About Partnerships**

Use email:

info@qualinovahub.com

Exhibition information can remain on the website.

Do not create a sponsor registration database, sponsor application workflow or unapproved sponsorship pricing.

---

## 8. TECHNOLOGY STACK

Preferred stack:

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Docker and Docker Compose
- Nginx reverse proxy
- HTTPS / SSL
- Secure server-side API
- Admin authentication with secure sessions

Use a maintainable, production-ready project structure.

Implement input validation, rate limiting, error handling, secure authentication, environment variables and database backups.

Include `.env.example`, setup instructions and database migrations.

---

## 9. EXISTING HOSTINGER VPS — CRITICAL SAFETY RULES

The organisation already has a **Hostinger KVM 2 VPS** running the NovaStay Hotels platform.

VPS IP: `200.97.172.67`

**NovaStay is an existing business application and must not be disrupted.**

Before deployment:

1. Inspect the existing VPS environment using authorised access.
2. Check CPU, RAM, disk, Docker containers, ports, PostgreSQL instances, reverse proxy and running services.
3. Identify available resources and port conflicts.
4. Take and verify appropriate backups.
5. Create an independent deployment for Bihar Healthcare Conclave.
6. Use a separate database, database user, application directory, Docker Compose project and environment file.
7. Apply appropriate CPU and memory limits.
8. Do not alter NovaStay's application code, database, containers or environment variables.
9. Do not restart existing NovaStay services.
10. Do not run destructive commands, Docker cleanup, database resets or system-wide upgrades.
11. Do not modify shared Nginx or proxy configuration without validating the change and preparing rollback.
12. Never expose database ports publicly.

**Do not assume that current low VPS usage guarantees sufficient capacity under peak traffic.**

Run resource checks and tests before deciding whether shared VPS deployment is safe.

If deployment could affect NovaStay, stop and explain the risk before making changes.

Do not request or print root passwords, private keys or API secrets in chat or logs.

---

## 10. DOMAIN & DEPLOYMENT

A new event domain will be connected to the existing VPS.

The domain name is not finalised yet.

Prepare the application so the domain can be configured later through environment variables and DNS settings.

Deployment requirements:

- Production build
- Secure HTTPS
- Domain and DNS configuration
- Database migrations
- Admin account setup
- Registration testing
- Email configuration
- SEO metadata
- Open Graph social sharing image
- Sitemap and robots.txt
- Error monitoring
- Database backups
- Mobile responsiveness testing

Do not claim the website is live until the domain resolves, HTTPS works and actual registrations are successfully stored and retrievable.

---

## 11. FUTURE PAYMENT SYSTEM

Payments have **NOT** been decided yet.

Do not activate any payment gateway.

Keep the architecture extensible so paid registration can be introduced later without rebuilding the website.

Any future paid-registration feature must remain disabled until explicitly approved.

---

## 12. FINAL ACCEPTANCE TESTS

Before declaring the project ready:

- Homepage loads correctly on mobile and desktop.
- All event details are accurate.
- All three official partner identities are displayed.
- Original logo assets are used.
- Engineering students can register.
- Free registration works end to end.
- Registration records persist in PostgreSQL.
- Duplicate submissions are handled.
- Confirmation reference is generated.
- Admin login works securely.
- Admin dashboard shows actual registrations.
- Registration export works.
- Sponsor registration is absent.
- No payment screen appears.
- NovaStay remains unaffected.
- HTTPS and production domain work after deployment.

## FINAL EXECUTION INSTRUCTION

First inspect the existing project files and explain the implementation plan.

Then implement the website, database, registration system and admin dashboard.

Run the application locally and test all critical functionality.

Prepare the deployment configuration for the existing Hostinger KVM 2 VPS.

Before any action affecting the existing VPS, verify NovaStay isolation and obtain approval for shared infrastructure changes.

At completion, report:

1. Features completed
2. Tests passed
3. Features pending
4. Deployment status
5. Domain/DNS actions required
6. Credentials or configuration still needed
7. Any risks to NovaStay

**Deliver a working, secure, launch-ready application—not just a visual prototype.**
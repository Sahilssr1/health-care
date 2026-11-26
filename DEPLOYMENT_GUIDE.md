# Bihar Healthcare Conclave 2026 — Deployment & Operations Guide

This guide explains step-by-step how to upload code, deploy updates to the live server, check registrations, and troubleshoot issues safely.

---

## 1. Quick Reference & Credentials

| Item | Details |
| :--- | :--- |
| **Live Website** | [https://biharhealthcareconclave.com](https://biharhealthcareconclave.com) |
| **Live Admin Panel** | [https://biharhealthcareconclave.com/admin](https://biharhealthcareconclave.com/admin) |
| **VPS IP Address** | `200.97.172.67` |
| **SSH / SFTP Username**| `root` |
| **SSH / SFTP Port** | `22` (SFTP - SSH File Transfer Protocol) |
| **Local Project Path**| `C:\Users\Sahil\OneDrive\Desktop\Work\bihar-healthcare\source` |
| **Server Remote Path** | `/opt/bhc2026/source` |
| **Docker App Container**| `bhc2026-app-1` (Next.js Node application) |
| **Docker DB Container** | `bhc2026-db-1` (PostgreSQL database) |

---

## 2. How to Upload Files (FileZilla SFTP)

Whenever you make changes to local code files (`.tsx`, `.ts`, `.css`), upload them to the VPS:

1. Open **FileZilla**.
2. Connect to the server:
   - **Host:** `sftp://200.97.172.67`
   - **Username:** `root`
   - **Password:** *(Your VPS root password)*
   - **Port:** `22`
3. Navigate to the folder by pasting into the **"Remote site:"** top bar in FileZilla:

| Destination Folder | Remote Path (Paste in FileZilla "Remote site:") |
| :--- | :--- |
| **Main Project Root** | `/opt/bhc2026/source` |
| **Components** | `/opt/bhc2026/source/components` |
| **App Pages & CSS** | `/opt/bhc2026/source/app` |
| **Register Page** | `/opt/bhc2026/source/app/register` |
| **Confirmation Page** | `/opt/bhc2026/source/app/confirmation` |
| **Lib / Utilities** | `/opt/bhc2026/source/lib` |
| **Public Assets & Images** | `/opt/bhc2026/source/public` |

---

### Exact Local ➔ Remote File Mapping Table:

| Local File (`C:\Users\Sahil\OneDrive\Desktop\Work\bihar-healthcare\source\`) | Remote Destination on Server |
| :--- | :--- |
| `components/theme-icon.tsx` | `/opt/bhc2026/source/components/theme-icon.tsx` |
| `components/partners.tsx` | `/opt/bhc2026/source/components/partners.tsx` |
| `components/event-interactions.tsx` | `/opt/bhc2026/source/components/event-interactions.tsx` |
| `components/programme-carousel.tsx` | `/opt/bhc2026/source/components/programme-carousel.tsx` |
| `compose.yml` (Main Docker Compose Configuration) | `/opt/bhc2026/source/compose.yml` |
| `deploy/compose.email.yml` (Email Worker Compose) | `/opt/bhc2026/source/deploy/compose.email.yml` |
| `scripts/email-worker.ts` (Email Delivery Worker) | `/opt/bhc2026/source/scripts/email-worker.ts` |
| `components/register-form.tsx` (Dynamic Registration Form) | `/opt/bhc2026/source/components/register-form.tsx` |
| `app/api/register/route.ts` (Registration API Handler) | `/opt/bhc2026/source/app/api/register/route.ts` |
| `app/confirmation/page.tsx` (Redesigned Pass UI) | `/opt/bhc2026/source/app/confirmation/page.tsx` |
| `app/confirmation-print.css` (A4 Print Stylesheet) | `/opt/bhc2026/source/app/confirmation-print.css` |
| `lib/digital-pass.ts` (PDF Pass Generator) | `/opt/bhc2026/source/lib/digital-pass.ts` |
| `lib/confirmation-message.ts` (Redesigned HTML Email) | `/opt/bhc2026/source/lib/confirmation-message.ts` |
| `app/register/page.tsx` (Register Form Layout) | `/opt/bhc2026/source/app/register/page.tsx` |
| `app/register-modern.css` (Registration UI CSS) | `/opt/bhc2026/source/app/register-modern.css` |
| `app/workshop-selection.css` (Workshop Cards CSS) | `/opt/bhc2026/source/app/workshop-selection.css` |
| `app/confirmation/layout.tsx` (3 lines only) | `/opt/bhc2026/source/app/confirmation/layout.tsx` |
| `app/enhancements.css` | `/opt/bhc2026/source/app/enhancements.css` |
| `lib/enhancement-data.ts` (Categories, Fees & Pricing) | `/opt/bhc2026/source/lib/enhancement-data.ts` |
| *(Dr. C.P. Thakur Logo)* | `/opt/bhc2026/source/public/logos/dr-cp-thakur.png` |
| *(Sutravya Logo)* | `/opt/bhc2026/source/public/logos/sutravya-logo.png` |

> ⚠️ **IMPORTANT SFTP RULES:**
> 1. Always check the **"Remote site:"** box before dropping a file so you don't accidentally drop root `page.tsx` into `app/register/` or root `layout.tsx` into `app/confirmation/`.
> 2. Never overwrite the server's `.env` file with your local `.env.local`. Keep server environment variables intact.

---

## 3. How to Deploy / Rebuild on the VPS (PuTTY / SSH)

After uploading your files via FileZilla, open **PuTTY** or your SSH terminal, connect to `200.97.172.67`, and run this **single command block**:

```bash
cd /opt/bhc2026/source && \
docker compose build --no-cache app && \
docker rm -f bhc2026-app-1 bhc2026-email-worker-1 && \
docker compose up -d app email-worker && \
docker network connect --alias bhc2026-event-app novastay-network bhc2026-app-1 && \
docker exec novastay-nginx-1 nginx -s reload
```

### What this command does:
1. `cd /opt/bhc2026/source` ➔ Moves to the project folder where `compose.yml` lives.
2. `docker compose build --no-cache app` ➔ Compiles the fresh Next.js production build without using stale cached layers.
3. `docker rm -f bhc2026-app-1 bhc2026-email-worker-1` ➔ Safely stops and removes both the old website container and the old email worker container.
4. `docker compose up -d app email-worker` ➔ Starts both the updated web app and the updated email worker (with the new 1-page PDF pass, 9 partners, and Important Instructions mounted).
5. `docker network connect --alias bhc2026-event-app novastay-network bhc2026-app-1` ➔ Connects the app to the Nginx reverse proxy network so Nginx can resolve `bhc2026-event-app:3000`.
6. `docker exec novastay-nginx-1 nginx -s reload` ➔ Tells Nginx to immediately reconnect to the new container without downtime.

> 💡 **Quick 502 Bad Gateway Fix:**
> If you ever see `502 Bad Gateway` after restarting Docker, simply reconnect Nginx:
> ```bash
> docker network connect --alias bhc2026-event-app novastay-network bhc2026-app-1
> docker exec novastay-nginx-1 nginx -s reload
> ```

---

## 4. How to View Registrations & Workshop Data

When a participant registers, their data is saved to the PostgreSQL database table `"Registration"`.

### Method A: Web Admin Dashboard (Easiest)
1. Go to: **[https://biharhealthcareconclave.com/admin](https://biharhealthcareconclave.com/admin)**
2. Log in with your admin credentials.
3. Click **View →** on any participant:
   - **`Interests:`** Shows Area of Interest (`Workshop`, `Conference`, `Exhibition`).
   - **`Specialisation:`** Shows the selected Workshop & Category (e.g. `CME: UG`, `CME: PG (SR)`, `CNE: B.Sc Nursing`, `Workshop for Paramedical`).
4. To export all data to Excel, click **"Export filtered CSV for Excel"**.

### Method B: Terminal SQL Query
In PuTTY, run this command to see the latest 5 registrations:
```bash
docker exec -i bhc2026-db-1 psql -U bhc2026 -d bhc2026 -c 'SELECT "reference", "fullName", "email", "mobile", "interest", "specialisation", "createdAt" FROM "Registration" ORDER BY "createdAt" DESC LIMIT 5;'
```

To search for a specific email (e.g., `test@example.com`):
```bash
docker exec -i bhc2026-db-1 psql -U bhc2026 -d bhc2026 -c 'SELECT "reference", "fullName", "email", "interest", "specialisation" FROM "Registration" WHERE LOWER("email") = LOWER('\''test@example.com'\'');'
```

---

## 5. How to Clear Cached Website Content (If Old Text or Partners Show)

The website caches editable content (Partners, Settings, Programmes) in the database table `"ContentRecord"`. If you update code files and the website still shows old content:

### To clear cached Partners:
```bash
echo 'DELETE FROM "ContentRecord" WHERE key = '\''partners'\'';' | docker exec -i bhc2026-db-1 psql -U bhc2026 -d bhc2026 && docker restart bhc2026-app-1
```

### To clear cached Settings (e.g., hero taglines, announcement banner):
```bash
echo 'DELETE FROM "ContentRecord" WHERE key = '\''settings'\'';' | docker exec -i bhc2026-db-1 psql -U bhc2026 -d bhc2026 && docker restart bhc2026-app-1
```

---

## 6. Local Development Reference (Your Laptop)

To test features locally before deploying to the VPS:

1. **Start the local Next.js server:**
   ```powershell
   cd C:\Users\Sahil\OneDrive\Desktop\Work\bihar-healthcare\source
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

2. **Open Visual Database Inspector (Prisma Studio):**
   ```powershell
   cd C:\Users\Sahil\OneDrive\Desktop\Work\bihar-healthcare\source
   npx prisma studio
   ```
   Open `http://localhost:5555` to view, search, and edit database records visually.

---

## 7. Golden Safety Rules on this Server

- ❌ **NEVER run:** `docker system prune -a` or `docker compose down -v`
  *(This server is shared with other applications like NovaStay. Running prune or volume deletion will break other live sites).*
- ❌ **NEVER stop `bhc2026-db-1` or `novastay-nginx-1`:**
  Keep the database and web proxy containers running.
- ✅ **ALWAYS include network alias after recreation:**
  ```bash
  docker network connect --alias bhc2026-event-app novastay-network bhc2026-app-1
  ```


# Google registration spreadsheet

Verified native Google Sheet:
https://docs.google.com/spreadsheets/d/1yaetiQgYi6LGIHBAwY3ooE-8XhRboxaRCxX2wWIr6f0/edit?usp=drivesdk

Tabs: `Summary` and `Registrations`. The latter contains every participant field, confirmation status, attendance, privacy consent and sync timestamp. Source data is PostgreSQL. On initial creation there were **zero actual participants**; no fake leads were uploaded. Existing participants, when present, are mirrored by the same worker as new ones. The Google Sheet is private; the connected Drive account and the browser's Google account may differ. Give access only to explicitly authorised organiser accounts.

## Actual activation requirement

The chat's Google Drive connection does not supply persistent credentials to the event website. **Automatic website-to-Sheets sync is not active until server write access is configured.** The code, database queue and private Sheet are prepared; this is not a claim of a live Google sync.

1. In the organiser's Google Cloud project, enable Google Sheets API and create a dedicated service account. No broad IAM roles or domain-wide delegation are needed for this Sheet. Obtain its JSON key through the organiser's normal secure setup; never paste keys in chat, source control, public assets or command arguments.
2. Share only this event Sheet with that service account's email as Editor. Keep general access Restricted. Store the JSON outside the source/deployment archive in a secrets directory or secret manager.
3. Locally configure `GOOGLE_APPLICATION_CREDENTIALS` to its absolute path. The verified Sheet ID/tab are already supplied in `lib/google-sheets-target.json`; overrides are optional.
4. Run `npm run sheets:sync` once, verify an actual saved registration by its reference, then run `npm run sheets:watch` under a supervised process. The worker polls every 30 seconds, paces Google requests and retries failures; a backlog can delay the mirror. Google credentials never enter browser code.
5. For approved isolated deployment, set `GOOGLE_SERVICE_ACCOUNT_FILE` to the secret JSON on the host. Activate only the BHC optional worker with `docker compose -p bhc2026 --profile sheets up -d sheets-worker`. The key is mounted read-only into that worker, not the public app image. Verify records and attendance updates in the private Sheet. Do not touch NovaStay services.

## Reliability and operations

Registration success depends on the PostgreSQL transaction. Google errors leave records queued and visible to the admin. Attendance and email-delivery changes increment a record revision for resync. The worker serialises sync transactions with a BHC-database advisory lock. Record metadata and first row creation are an atomic Google batch using a unique, deterministic metadata ID. If an HTTP response is lost after commit, the next attempt updates the identified row instead of adding a duplicate. Existing imported references are adopted; duplicate references or changed headers cause a safe retry/error rather than unrelated data being overwritten.

Use filter views for organiser review. Do not rename `Registrations`, change headers/references, delete identity metadata, or manually insert participant data into the integration-owned tab. Make organiser annotations on a separate tab keyed by registration reference. Row identity follows native row moves, but simultaneous manual edits to integration data are not supported. Summary formulas count the mirrored dataset; the app dashboard also shows pending records, so a lagging Google count is not mistaken for a lost registration. Google API quota/metadata limits are monitored as sync errors; PostgreSQL records are retained if the destination reaches a limit. Establish organiser-approved retention/deletion for both copies before launch.

Testing: core registration tests, real local PostgreSQL integration tests and mock-Google tests cover duplicate/ambiguous writes, row moves and literal text handling. Google service-account authentication and live automatic sync remain unverified until credentials are supplied. The connected-tool Sheet creation/readback is independent of server authentication.

Official API references: https://developers.google.com/identity/protocols/oauth2/service-account and https://developers.google.com/workspace/sheets/api/guides/metadata

# Live polish and dual participation — 29 October 2026

Three explicit choices: Quiz only, Hackathon only, Quiz + Hackathon. Both uses the same verified email and education details, creating separate references with existing protected endpoints. Already saved entries are skipped. Quiz never receives Hackathon team details. A partial save reports the saved Quiz and remaining Hackathon error; existing data is retained. Saved entries link to the other competition. Optional teams apply only to Hackathon.

No mandatory fields or eligibility requirements changed: user deferred these until feedback.

Visual polish: shared blue/green styling, calmer backgrounds, consistent cards, spacing, form focus states, button states and responsive three-choice layout. No external fonts/scripts added.

Checks: TypeScript passed; 25 unit/mock tests passed; 5 competition integration groups passed. Actual isolated browser form saved both entries, confirmed in PostgreSQL. Public homepage, competitions, registration, programme, partners HTTP checks passed. Mobile 390 px viewport / 375 px content: no horizontal overflow. Desktop uses three choice columns; mobile one. Live screenshots in docs/proof/premium-participation-*.png.

Production image bhc2026-app-premium-20261029:latest. Runtime canary healthy before activation. Only Conclave app replaced; all other pre-existing container IDs unchanged, no proxy reload/database migration. Disposable canary/environment file removed. Source and previous compose backed up in /opt/bhc2026/backups/20261029-premium.

An initial deployment verification looked for a source CSS filename in bundled HTML and triggered guarded rollback; corrected content checks passed, then final activation succeeded (PREMIUM_LIVE_OK).

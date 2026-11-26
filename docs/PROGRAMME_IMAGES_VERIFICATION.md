# Programme card imagery, 15 October 2026

All 15 approved programme cards display matching illustrations from the organiser-supplied Programme Highlights poster. The source PNG remains unchanged. A 263 KB WebP copy is served once and reused through responsive CSS display windows; no new event photography or identities are invented. Cards retain accessible programme titles, original ordering, details and registration/enquiry links. Unknown future CMS programme IDs simply omit artwork.

Verified locally: production build and TypeScript pass; all 15 card images visible; Technology filter retains programmes 08 and 14 with their matching artwork; 390px mobile layout has no horizontal overflow. Desktop/full-page screenshot visually reviewed for all rows. Pass generation, email worker, registration data and admin access are unchanged.

Deployment: app-only release, database/email worker/shared proxy untouched. Rollback app overlay is backed up at /opt/bhc2026/backups/20261015-programme-images/compose.release.before.yml. Live checks recorded below after release.

Live release verified: bhc2026-app-programme-images-20261015:latest. Programme page shows 15 matching image windows with original programme order and accessible labels. Original pass design and email worker were not changed. Only the BHC app container was replaced; all other service IDs and the shared proxy hash were checked against pre-release backups.

# VPS read-only inspection — 12 October 2026

Verified signed-in Hostinger account and authenticated web console for srv1833635.hstgr.cloud, IPv4 200.97.172.67, Ubuntu 24.04.4.

Observed: 2 CPU, 7940 MB RAM, ~7130 MB available, no swap; load 0.07/0.03/0.00. Root disk 96 GB, 93 GB available. Port 3106 has no listener. /opt/bhc2026 absent.

Existing project novastay: nginx:1.27-alpine, novastay-frontend, novastay-backend, postgres:17-alpine; all four healthy. Nginx owns host 80/443, backend publishes 4000. NovaStay homepage and /ready returned HTTPS 200.

Proxy is a Docker container, not host Nginx. Existing mount /root/NovaStay/nginx/compose.conf -> /etc/nginx/conf.d/default.conf; /etc/letsencrypt mounted. Network novastay-network, no extra host mappings. The original proposed host Nginx/loopback vhost cannot be installed as written. A container cannot reach host loopback 3106 via its own 127.0.0.1.

Hostinger weekly backups listed 8 October and 1 October 2026. Latest discovered NovaStay database dump is 14 August 2026. Backup restoration and current DB backup remain unverified; no snapshot, backup creation or restore was run.

Decision: no deployment mutation yet. Public HTTPS routing requires an explicitly approved exception to the user's prohibition on changes to existing proxy configuration. No existing service, container, database, DNS or configuration was altered, reloaded, restarted or stopped.

Next preparation: define a durable event upstream reachable by the existing container while keeping the BHC database on its private network, prepare additive event-only routing with unchanged NovaStay blocks, certificate provisioning and rollback, then obtain approval before any shared-proxy change/reload or new security-sensitive access. Do not attach the BHC database to the NovaStay network.

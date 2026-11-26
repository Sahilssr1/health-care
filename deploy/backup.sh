#!/bin/sh
set -eu
umask 077
cd "$(dirname "$0")/.."
mkdir -p backups
file="backups/bhc-$(date -u +%Y%m%dT%H%M%SZ).dump"
docker compose -p bhc2026 exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > "$file"
test -s "$file"
docker compose -p bhc2026 exec -T db pg_restore --list < "$file" > /dev/null
printf 'Backup archive created and readable. Perform restore verification in an isolated database.\n'

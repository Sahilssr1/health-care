FROM node:22-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
ARG APP_ORIGIN
ENV APP_ORIGIN=${APP_ORIGIN}
RUN npm run build
FROM base AS runner
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
RUN groupadd --gid 1001 bhc && useradd --uid 1001 --gid bhc bhc
COPY --from=builder --chown=bhc:bhc /app/.next/standalone ./
COPY --from=builder --chown=bhc:bhc /app/.next/static ./.next/static
COPY --from=builder --chown=bhc:bhc /app/public ./public
USER bhc
EXPOSE 3000
CMD ["node","server.js"]
FROM builder AS tools
CMD ["npm","run","db:migrate"]

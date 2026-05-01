# Deployment

## Overview
This stack deploys an Astro static site behind Caddy using Docker Compose. The Astro image is built from source, serves the built `dist` output on port `4321`, and is only exposed to the internal Docker network. Caddy listens on ports `80` and `443`, handles TLS for `volitionlabs.org` and `www.volitionlabs.org`, and reverse proxies requests to `astro:4321`.

## Components
- `Dockerfile`: Multi-stage Node 22 Alpine build; runs `npm ci`, `npm run build`, then serves `dist` with `serve -s dist -l 4321`.
- `docker-compose.yml`:
  - `astro` service: built from `.`, `restart: unless-stopped`, internal `expose: 4321`.
  - `caddy` service: `caddy:2`, publishes `80:80` and `443:443`, mounts `./Caddyfile` read-only.
  - Persistent volumes: `caddy_data` and `caddy_config` keep TLS certs/config data across restarts.
- `Caddyfile`: Enables `zstd`/`gzip` response encoding and reverse proxies both domains to `astro:4321`.

## Deployment Steps
1. Ensure DNS for `volitionlabs.org` and `www.volitionlabs.org` points to the host running Docker.
2. From repo root, build and start services:
   ```bash
   docker compose up -d --build
   ```
3. Confirm containers are healthy/running:
   ```bash
   docker compose ps
   ```
4. Tail logs (all services or specific service):
   ```bash
   docker compose logs -f
   docker compose logs -f caddy
   docker compose logs -f astro
   ```
5. Restart services after config/content changes:
   ```bash
   docker compose restart
   docker compose restart caddy
   docker compose restart astro
   ```
6. Rebuild and redeploy after application changes:
   ```bash
   docker compose up -d --build
   ```

## Request Flow
1. Client requests `http://volitionlabs.org` or `https://www.volitionlabs.org`.
2. Request reaches Caddy on published host ports `80`/`443`.
3. Caddy applies automatic HTTPS/TLS and content encoding (`zstd`, `gzip`).
4. Caddy reverse proxies upstream traffic to the internal Docker service `astro:4321`.
5. Astro container serves static build artifacts from `dist` via `serve`.

## Operational Notes
- `astro` is not published to the host; only Caddy is public-facing.
- TLS state is persisted in named volumes (`caddy_data`, `caddy_config`), preventing certificate loss on container recreation.
- `depends_on` ensures Caddy starts after Astro is started, but not full app-level readiness checks.
- App updates require image rebuild (`docker compose up -d --build`) since the static bundle is baked into the Astro image.

# Astro on DigitalOcean (Docker + Caddy)

## 1) DNS and Droplet

1. Create an Ubuntu Droplet.
2. Point `A` record(s) to the Droplet IP (for example `example.com` and `www.example.com`).
3. SSH in and install Docker:

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
docker --version
docker compose version
```

## 2) Add runtime files in repo root

Create `Dockerfile`:

```Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
RUN npm i -g serve
EXPOSE 4321
CMD ["serve", "-s", "dist", "-l", "4321"]
```

Create `Caddyfile`:

```caddy
example.com, www.example.com {
  encode zstd gzip
  reverse_proxy astro:4321
}
```

Create `docker-compose.yml`:

```yaml
services:
  astro:
    build: .
    container_name: astro-site
    restart: unless-stopped
    expose:
      - "4321"

  caddy:
    image: caddy:2
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - astro

volumes:
  caddy_data:
  caddy_config:
```

## 3) Deploy

```bash
git clone <your-repo-url>
cd <your-repo-folder>
docker compose up -d --build
docker compose ps
```

Open `https://example.com`. Caddy will auto-provision TLS.

## 4) Update after new commits

```bash
git pull
docker compose up -d --build
```

## 5) Add more apps later

1. Add a new service to `docker-compose.yml` (for example `api`, `admin`, `docs`).
2. Add another site block (or path rule) in `Caddyfile`.
3. Run `docker compose up -d --build`.

Example extra route:

```caddy
api.example.com {
  reverse_proxy api:3000
}
```

# syntax=docker/dockerfile:1
# ── Stage 1: install & compile all dependencies ──────────────────────────────
FROM node:22-slim AS deps

# Build tools needed for better-sqlite3 and @resvg/resvg-js native modules.
# The apt cache mount keeps the package lists between builds instead of
# re-downloading ~90s of index every time.
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++

WORKDIR /app
COPY package*.json ./

# The npm cache mount is the big one: better-sqlite3 and @resvg/resvg-js are
# native modules, so a cold `npm ci` downloads and compiles from source (~28
# min on a small VPS). With the cache, a rebuild after a lockfile change reuses
# the downloaded tarballs and prebuilt binaries instead of starting over.
# --no-audit/--no-fund drop two pointless network round-trips.
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit --no-fund


# ── Stage 2: build Next.js ────────────────────────────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# ── Stage 3: production runtime ───────────────────────────────────────────────
FROM node:22-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Runtime deps (includes native .node binaries compiled in stage 1)
COPY --from=deps    /app/node_modules    ./node_modules

# Built app
COPY --from=builder /app/.next           ./.next
COPY --from=builder /app/next.config.js  ./
COPY --from=builder /app/package.json    ./

# jsconfig needed for @/ alias resolution at runtime via node_modules
COPY --from=builder /app/jsconfig.json   ./

# Empty public dir (Next.js expects it)
RUN mkdir -p ./public

# SQLite data dir owned by app user
RUN mkdir -p ./data && chown nextjs:nodejs ./data

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/api/demos').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node_modules/.bin/next", "start"]

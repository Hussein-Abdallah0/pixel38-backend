AI tools used: Cursor (agent mode) for code generation, Claude for planning/architecture guidance and the Figma MCP workflow

Time spent: Approximately 10 hours. Prioritized core functionality (auth, CRUD, homepage) over full polish given the time constraint. Not yet tested end-to-end.

# Pixel38 Backend

REST API for the [Pixel38 wood products website and CMS](../PROJECT_BRIEF.md). Built with **NestJS**, **PostgreSQL**, and **Prisma**. Public GET endpoints serve website content; protected write endpoints power the admin dashboard.

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- **Docker** (recommended for local PostgreSQL) or an existing PostgreSQL 16 instance

## Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

Copy the example env file and edit values as needed:

```bash
cp .env.example .env
```

See [Environment variables](#environment-variables) below for details on each variable.

### 3. Start PostgreSQL

**Option A — Docker (recommended)**

```bash
docker compose up -d
```

This starts PostgreSQL 16 on `localhost:5432` with the credentials defined in `docker-compose.yml` (`pixel38` / `pixel38`, database `pixel38`).

**Option B — Existing PostgreSQL**

Create a database and update `DATABASE_URL` and `DIRECT_URL` in `.env` to point at your instance.

### 4. Run database migrations

Generate the Prisma client and apply migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

`prisma:migrate` runs `prisma migrate dev`, which applies pending migrations in `prisma/migrations/` and keeps your local schema in sync.

### 5. Seed the database (optional)

Populate the database with sample homepage content, services, products, and a default admin user:

```bash
npm run prisma:seed
```

Default admin credentials (from `prisma/seed.ts`):

| Field    | Value               |
| -------- | ------------------- |
| Email    | `admin@pixel38.com` |
| Password | `admin12345`        |

### 6. Start the API

```bash
# Development (watch mode)
npm run start:dev

# Production build
npm run build
npm run start:prod
```

The server listens on `http://localhost:3001` by default (configurable via `PORT`).

### 7. Explore the API

Interactive Swagger documentation is available at:

```
http://localhost:3001/api
```

Use **POST /auth/login** to obtain an access token, then click **Authorize** in Swagger and paste the `accessToken` as a Bearer token for protected endpoints.

## Environment variables

| Variable                 | Required | Default                 | Description                                                                           |
| ------------------------ | -------- | ----------------------- | ------------------------------------------------------------------------------------- |
| `DATABASE_URL`           | Yes      | —                       | PostgreSQL connection string used by Prisma at runtime                                |
| `DIRECT_URL`             | Yes      | —                       | Direct PostgreSQL connection for migrations (same as `DATABASE_URL` for local Docker) |
| `JWT_ACCESS_SECRET`      | Yes      | —                       | Secret for signing access tokens (use a strong random string, 32+ characters)         |
| `JWT_REFRESH_SECRET`     | Yes      | —                       | Secret for signing refresh tokens (must differ from access secret)                    |
| `JWT_ACCESS_EXPIRATION`  | No       | `15m`                   | Access token lifetime (e.g. `15m`, `1h`)                                              |
| `JWT_REFRESH_EXPIRATION` | No       | `7d`                    | Refresh token lifetime (e.g. `7d`, `30d`)                                             |
| `PORT`                   | No       | `3001`                  | HTTP port the NestJS server binds to                                                  |
| `CORS_ORIGINS`           | No       | `http://localhost:3000` | Comma-separated list of allowed frontend origins                                      |
| `FRONTEND_URL`           | No       | —                       | Single-origin shorthand; used only if `CORS_ORIGINS` is unset                         |

Example `.env` (matches Docker Compose defaults):

```env
DATABASE_URL="postgresql://pixel38:pixel38@localhost:5432/pixel38?schema=public"
DIRECT_URL="postgresql://pixel38:pixel38@localhost:5432/pixel38?schema=public"

JWT_ACCESS_SECRET="change-me-access-secret-min-32-characters"
JWT_REFRESH_SECRET="change-me-refresh-secret-min-32-characters"
JWT_ACCESS_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"

PORT=3001
CORS_ORIGINS=http://localhost:3000
```

## Database setup (Prisma)

### Schema

The data model lives in `prisma/schema.prisma` and covers:

- **User** — admin accounts with bcrypt-hashed passwords and refresh tokens
- **HeroSection** — singleton homepage hero (fixed id `homepage-hero`)
- **Banner**, **TextSection**, **HomepageImage** — ordered, publishable homepage content
- **Service** — services displayed on the public site
- **Product** / **ProductImage** — wood products with sortable image galleries

### Common commands

```bash
# Regenerate Prisma Client after schema changes
npm run prisma:generate

# Create and apply a new migration (development)
npm run prisma:migrate

# Apply migrations in production/CI (no prompts)
npx prisma migrate deploy

# Reset database and re-apply all migrations (destructive)
npx prisma migrate reset

# Seed sample data
npm run prisma:seed

# Open Prisma Studio (visual DB browser)
npx prisma studio
```

### First-time setup flow

```bash
docker compose up -d          # start Postgres
npm run prisma:generate     # generate @prisma/client
npm run prisma:migrate        # apply prisma/migrations/* to the database
npm run prisma:seed           # optional: load demo content + admin user
```

Migrations are version-controlled under `prisma/migrations/`. The initial migration (`20260711172915_init`) creates all tables, indexes, and the `UserRole` enum.

## Architecture overview

### High-level design

```
┌─────────────┐     REST (JSON)      ┌──────────────────────────────────┐
│  Next.js    │ ◄──────────────────► │  NestJS API (port 3001)          │
│  Frontend   │   JWT on write ops   │  Swagger at /api                 │
└─────────────┘                      └──────────────┬───────────────────┘
                                                    │ Prisma
                                                    ▼
                                       ┌────────────────────────┐
                                       │  PostgreSQL            │
                                       └────────────────────────┘
```

- **Public reads** — GET endpoints for homepage, services, and products are marked `@Public()` and require no authentication.
- **Protected writes** — POST, PATCH, DELETE endpoints require a valid JWT access token. A global `JwtAuthGuard` enforces this by default; individual routes opt out with `@Public()`.
- **Token flow** — Access tokens (short-lived) authenticate API requests. Refresh tokens (long-lived, hashed in the database) rotate via `POST /auth/refresh`.

### Folder structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Data model
│   ├── migrations/            # Versioned SQL migrations
│   ├── seed.ts                # Database seeder
│   └── seed-homepage-data.ts  # Static seed content
├── src/
│   ├── main.ts                # Bootstrap: CORS, validation, Swagger
│   ├── app.module.ts          # Root module — wires all feature modules
│   ├── auth/                  # JWT authentication
│   ├── homepage/              # Homepage CMS (hero, banners, text, images)
│   ├── services/              # Services CRUD
│   ├── products/              # Products + product images CRUD
│   ├── prisma/                # Global PrismaService wrapper
│   ├── common/                # Shared DTOs, utils, Swagger examples
│   └── config/                # App-level config (e.g. CORS)
├── test/                      # E2E tests
├── docker-compose.yml         # Local PostgreSQL
└── .env.example               # Environment variable template
```

### Why modules are organized this way

NestJS uses a **feature-module** pattern: each business domain is a self-contained module with its own controller(s), service(s), and DTOs. This keeps concerns isolated and makes the dependency graph explicit.

| Module             | Responsibility                                        | Why separate                                                                                                                                                                                                           |
| ------------------ | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PrismaModule**   | Database access via `PrismaService`                   | Marked `@Global()` so any feature module can inject `PrismaService` without importing PrismaModule everywhere. Single connection lifecycle for the app.                                                                |
| **AuthModule**     | Login, logout, token refresh, Passport JWT strategies | Authentication is cross-cutting but has enough moving parts (strategies, guards, decorators, token utils) to warrant its own module. Exports `AuthService` if other modules need auth helpers.                         |
| **HomepageModule** | Hero, banners, text sections, homepage images         | Homepage content is a distinct CMS domain with its own aggregate response shape (`GET /homepage`). Grouping these entities avoids a bloated root module.                                                               |
| **ServicesModule** | Service listings CRUD                                 | Independent content type with its own lifecycle and ordering — matches the CMS "Services" admin section.                                                                                                               |
| **ProductsModule** | Products + product images                             | Product images are a nested resource (`/products/:id/images`). Both controllers share the same domain and live in one module rather than splitting into two, since image operations always depend on a parent product. |
| **common/**        | `ReorderDto`, `slug.util`, Swagger examples           | Not a NestJS module — shared code used across features without creating circular imports between feature modules.                                                                                                      |
| **config/**        | CORS origin parsing                                   | Environment-driven configuration kept out of `main.ts` for testability and clarity.                                                                                                                                    |

### Request lifecycle

1. Request hits a controller route.
2. Global `ValidationPipe` validates and transforms the request body/query (class-validator DTOs).
3. Global `JwtAuthGuard` checks for `@Public()` — if absent, validates the Bearer access token via `JwtStrategy`.
4. Controller delegates to a service, which uses `PrismaService` for database operations.
5. Response is serialized (Swagger decorators document the shape).

### Key files

| File                                            | Role                                                                          |
| ----------------------------------------------- | ----------------------------------------------------------------------------- |
| `src/app.module.ts`                             | Registers all modules, enables global config, applies `JwtAuthGuard` app-wide |
| `src/auth/guards/jwt-auth.guard.ts`             | Global guard with `@Public()` bypass                                          |
| `src/auth/decorators/public.decorator.ts`       | Marks routes that skip authentication                                         |
| `src/auth/decorators/current-user.decorator.ts` | Injects the authenticated `User` into handler params                          |
| `src/prisma/prisma.service.ts`                  | Extends `PrismaClient`, handles connect/disconnect lifecycle                  |

## Scripts reference

| Command                   | Description                       |
| ------------------------- | --------------------------------- |
| `npm run start:dev`       | Start in watch mode (development) |
| `npm run build`           | Compile TypeScript to `dist/`     |
| `npm run start:prod`      | Run compiled production build     |
| `npm run prisma:generate` | Generate Prisma Client            |
| `npm run prisma:migrate`  | Run `prisma migrate dev`          |
| `npm run prisma:seed`     | Seed database with sample data    |
| `npm run test`            | Unit tests                        |
| `npm run test:e2e`        | End-to-end tests                  |
| `npm run lint`            | ESLint with auto-fix              |

## API endpoints (summary)

| Tag            | Base path                     | Public reads                   | Protected writes                                        |
| -------------- | ----------------------------- | ------------------------------ | ------------------------------------------------------- |
| Auth           | `/auth`                       | `POST /login`, `POST /refresh` | `POST /logout`, `GET /me`                               |
| Homepage       | `/homepage`                   | `GET /`                        | `PATCH /`                                               |
| Services       | `/services`                   | `GET /`, `GET /:id`            | `POST /`, `PATCH /:id`, `DELETE /:id`, `PATCH /reorder` |
| Products       | `/products`                   | `GET /`, `GET /:id`            | `POST /`, `PATCH /:id`, `DELETE /:id`, `PATCH /reorder` |
| Product Images | `/products/:productId/images` | `GET /`                        | `POST /`, `PATCH /:id`, `DELETE /:id`, `PATCH /reorder` |

Full request/response schemas and examples are in Swagger at `/api`.

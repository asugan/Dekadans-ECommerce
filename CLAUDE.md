# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern e-commerce application (`dekadans-eticaret`) built with the TanStack ecosystem. It's a full-stack React application using TanStack Start (a full-stack framework) with TypeScript, Prisma for database management, and Tailwind CSS for styling.

**Current State:** The project is in early development with a solid foundation but e-commerce features are not yet implemented. The current focus is on setting up the core architecture, authentication system, and development infrastructure.

## Development Commands

### Essential Development
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run serve` - Preview production build
- `npm run test` - Run tests with Vitest

### Code Quality
- `npm run lint` - Lint code with Biome
- `npm run format` - Format code with Biome
- `npm run check` - Run both linting and formatting checks

### Database Operations
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio database browser
- `npm run db:seed` - Seed database with initial data

**Note:** All database commands require `.env.local` file with `DATABASE_URL` environment variable.

## Architecture Overview

### Core Technologies
- **Framework**: TanStack Start (full-stack React framework) with React 19
- **Routing**: TanStack Router with file-based routing
- **Authentication**: Better Auth 1.3.31 with Prisma adapter
- **Data Fetching**: TanStack Query + tRPC for type-safe APIs (currently in-memory)
- **Database**: Prisma ORM with SQLite (authentication models only)
- **Styling**: Tailwind CSS v4 with custom theme
- **State Management**: TanStack Store + Jotai with TanStack Query integration
- **Forms**: TanStack Form with Zod validation
- **UI Components**: Radix UI primitives + Shadcn components
- **Development Tools**: Comprehensive TanStack devtools suite
- **Testing**: Vitest + Testing Library
- **Code Quality**: Biome for formatting and linting

### Project Structure

#### Routing (`src/routes/`)
- File-based routing system where each `.tsx` file becomes a route
- `__root.tsx` - Root layout with Header and comprehensive devtools
- `index.tsx` - Homepage showcasing TanStack Start features
- `api/` - API routes for authentication and tRPC endpoints
  - `api.auth.$.tsx` - Better Auth API handler
  - `api.trpc.$.tsx` - tRPC API endpoint

#### Database & Authentication (`src/db.ts`, `schema.prisma`, `src/lib/auth.ts`)
- SQLite database with Prisma ORM
- Authentication models: User, Session, Account, Verification
- Better Auth configuration with Prisma adapter
- Database client initialized with singleton pattern in `src/db.ts`

#### tRPC Integration (`src/integrations/trpc/`)
- Type-safe API endpoints using in-memory data (not database)
- Router defined in `src/integrations/trpc/router.ts`
- Client setup in `src/integrations/trpc/react.ts`
- Initialization in `src/integrations/trpc/init.ts`

#### UI Components (`src/components/`)
- `Header.tsx` - Main navigation header with expandable sidebar menu
- `ui/` - Shadcn UI components (currently only Switch component)

#### Library Integrations
- `src/integrations/tanstack-query/` - TanStack Query setup and devtools
- `src/lib/` - Utility functions and authentication configuration
  - `utils.ts` - Class name utilities (clsx, tailwind-merge)
  - `auth.ts` - Better Auth server configuration
  - `auth-client.ts` - Better Auth client configuration

### Environment Configuration
- Uses `@t3-oss/env-core` for type-safe environment variables
- Client variables must be prefixed with `VITE_`
- Database operations require `.env.local` file with `DATABASE_URL`
- Environment commands use `dotenv-cli` to load `.env.local`

### Better Auth Integration
- Authentication system built with Better Auth 1.3.31
- Prisma adapter for database persistence
- Full authentication flow: signup, signin, signout
- Session management with secure tokens
- Email verification support
- Social authentication providers ready to configure
- Auth API endpoint at `/api/auth`

### Development Tools Integration
The app includes comprehensive development tools accessible via unified devtools panel:
- TanStack Router Devtools - Route inspection and navigation
- TanStack Query Devtools - Query state and cache management
- TanStack Store Devtools - Global state inspection
- All devtools can be toggled on/off during development

## Development Guidelines

### Adding New Routes
Create new files in `src/routes/` directory. TanStack Router will automatically handle route generation. Each `.tsx` file becomes a route automatically.

### Using Shadcn Components
Add new components using the latest version:
```bash
pnpx shadcn@latest add button
```
Currently installed: Switch component

### Form Development
Use TanStack Form with Zod validation. Form patterns are available but no demo forms exist yet in the current project.

### Data Fetching Patterns
1. **Route Loaders**: Use `loader` in route definitions for SSR data loading
2. **tRPC**: Use `trpc.*` procedures for type-safe API calls (currently uses in-memory data)
3. **TanStack Query**: Use `useQuery` for client-side data fetching with Jotai integration

### Authentication Development
- Authentication is handled by Better Auth with Prisma adapter
- Auth configuration in `src/lib/auth.ts` (server) and `src/lib/auth-client.ts` (client)
- Current auth models: User, Session, Account, Verification
- API endpoint: `/api/auth` handles all authentication requests

## Database Development

### Schema Changes
1. Modify `schema.prisma`
2. Run `npm run db:push` (development) or `npm run db:migrate` (production)
3. Run `npm run db:generate` to update client types

### Current Database Models
- **User**: Core user model with email, name, profile info
- **Session**: Authentication session management
- **Account**: OAuth/social account linking
- **Verification**: Email verification tokens

### Seeding Data
- Seed script defined in `seed.ts` but currently references non-existent Todo model
- Run with `npm run db:seed` (currently broken due to model mismatch)

## Code Style
- Uses Biome for formatting and linting
- Tab indentation (configured in `biome.json`)
- Double quotes for JavaScript strings
- Import organization is automatic on save

## Current Limitations & Known Issues

### Database & Data Inconsistencies
- **Seed Script Mismatch**: `seed.ts` references `prisma.todo` model but no Todo model exists in schema
- **In-Memory Data**: tRPC API uses in-memory array instead of database persistence
- **Limited Models**: Only authentication models exist, no e-commerce models yet

### Missing Features
- No demo pages or examples (referenced in old docs but don't exist)
- No e-commerce functionality implemented yet
- Form examples are referenced but don't exist
- Limited UI components (only Switch component installed)

### Development Notes
- Database operations require `.env.local` with `DATABASE_URL`
- The project uses SQLite by default (configurable in Prisma schema)
- All development tools are included and can be toggled on/off via the devtools panel
- Project is in early development phase - core architecture is solid, features are minimal
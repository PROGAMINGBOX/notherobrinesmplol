# SmoothOpsX

A Regulatory/Compliance Changelog platform that helps developers stay on top of regulatory changes. SmoothOpsX monitors updates from privacy regulations, app store policies, security standards, and more, then translates them into actionable developer tasks.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js (Credentials provider)
- **Validation:** Zod

## Prerequisites

- Node.js 18+ (recommended: 20+)
- PostgreSQL 14+
- npm or pnpm

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd smoothopsx
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/smoothopsx"
NEXTAUTH_SECRET="your-secret-here-generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secure secret:

```bash
openssl rand -base64 32
```

### 4. Set up the database

```bash
npx prisma migrate dev
```

### 5. Seed the database

```bash
npx prisma db seed
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for signing JWT tokens (generate with `openssl rand -base64 32`) | Yes |
| `NEXTAUTH_URL` | Base URL of the application (e.g., `http://localhost:3000`) | Yes |

## Project Structure

```
smoothopsx/
├── app/                    # Next.js App Router pages and API routes
│   ├── (auth)/             # Authentication pages (signin, signup)
│   ├── api/                # API route handlers
│   │   ├── auth/           # NextAuth.js endpoints
│   │   ├── actions/        # Action items CRUD
│   │   ├── onboarding/     # User onboarding
│   │   ├── regulations/    # Regulations feed
│   │   ├── settings/       # User settings
│   │   └── stats/          # Dashboard statistics
│   ├── dashboard/          # Protected dashboard pages
│   ├── onboarding/         # Onboarding wizard
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable React components
│   ├── dashboard/          # Dashboard-specific components
│   ├── landing/            # Landing page components
│   └── ui/                 # Generic UI components
├── lib/                    # Utility functions and shared code
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Prisma client singleton
│   └── utils.ts            # Helper utilities
├── prisma/                 # Database schema and seed data
│   ├── schema.prisma       # Prisma schema definition
│   └── seed.ts             # Database seed script
├── types/                  # TypeScript type definitions
├── middleware.ts           # Next.js middleware (route protection)
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.js          # Next.js configuration
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (includes `prisma generate`) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma migrate dev` | Run database migrations in development |
| `npx prisma db seed` | Seed the database with sample data |
| `npx prisma studio` | Open Prisma Studio (database GUI) |
| `npx prisma generate` | Generate Prisma Client |

## Deployment (Vercel)

### 1. Connect your database

Use a managed PostgreSQL provider such as:
- [Supabase](https://supabase.com)
- [Neon](https://neon.tech)
- [PlanetScale](https://planetscale.com) (MySQL alternative)

### 2. Set environment variables

In your Vercel project settings, add:
- `DATABASE_URL` - Your production database connection string
- `NEXTAUTH_SECRET` - A secure random secret
- `NEXTAUTH_URL` - Your production domain (e.g., `https://your-app.vercel.app`)

### 3. Build configuration

The build command already includes `prisma generate`:

```json
{
  "build": "prisma generate && next build"
}
```

Prisma Client is generated during the build step, so no additional configuration is needed.

### 4. Database migrations

Run migrations against your production database:

```bash
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

## License

MIT

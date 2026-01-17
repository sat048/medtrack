# MedTrack Pro - Symptom Intelligence Dashboard

A full-stack medical symptom tracking application that automatically correlates symptoms with weather data and generates AI-powered clinical summaries for healthcare providers.

## System Architecture

### Technology Stack

**Frontend Framework**
- Next.js 14+ (App Router) - Server-side rendering and API routes
- TypeScript - Type safety across the application
- React 18+ - Component-based UI architecture

**Styling & UI**
- Tailwind CSS - Utility-first styling framework
- Shadcn UI - Accessible component library
- Custom medical/healthcare theme (blues, teals, whites)

**Authentication**
- Clerk v5 - User authentication and session management
- Middleware-based route protection
- Server-side authentication checks

**Database & ORM**
- PostgreSQL (Neon.tech) - Relational database for symptom logs
- Prisma - Type-safe database ORM with migrations
- UUID primary keys for symptom logs

**External APIs**
- Open-Meteo API - Weather data correlation (temperature, humidity, weather codes)
- Google Gemini API - AI-powered clinical summary generation

**Deployment**
- Vercel - Serverless deployment platform
- Environment-based configuration

### System Design

#### Data Flow

1. **Symptom Logging**
   - User submits symptom form with type, severity, and notes
   - Browser geolocation API captures user coordinates
   - Backend API route (`/api/symptoms`) receives submission
   - Open-Meteo API fetches current weather data for coordinates
   - Symptom log and weather data stored in PostgreSQL via Prisma

2. **Dashboard Visualization**
   - Server-side data fetching using Prisma Client
   - Recharts library renders severity trends over time
   - Real-time statistics calculation (total logs, average severity)
   - Weather icons displayed alongside each log entry

3. **AI Summary Generation**
   - Fetches last 10 symptom logs from database
   - Formats logs with dates, severity, weather data, and notes
   - Sends formatted data to Google Gemini API with medical prompt
   - Returns formatted clinical summary for doctor review
   - Copy-to-clipboard functionality for easy sharing

#### Authentication Flow

- Clerk middleware protects all routes except public pages
- Public routes: `/`, `/sign-in`, `/sign-up`
- Protected routes: `/dashboard/*`, `/api/*`
- Server-side `auth()` checks in API routes and pages
- Automatic redirects for authenticated/unauthenticated users

#### Database Schema

```
SymptomLog
├── id (UUID, primary key)
├── userId (String, Clerk user ID)
├── symptomType (String)
├── severity (Int, 1-10)
├── notes (Text, nullable)
├── temperature (Float, nullable)
├── humidity (Float, nullable)
├── weatherCode (Int, nullable)
├── createdAt (DateTime)
└── updatedAt (DateTime)

Indexes:
- userId (for user-specific queries)
- createdAt (for time-based sorting)
```

## Features

- **Smart Symptom Logging**: Track symptoms with severity ratings and automatic weather correlation
- **Weather Integration**: Real-time weather data (temperature, humidity, conditions) captured with each log
- **Visual Analytics**: Interactive charts showing severity trends and patterns over time
- **AI-Powered Summaries**: Generate professional clinical summaries using Google Gemini API
- **Secure Authentication**: Clerk-based authentication with protected routes
- **Responsive Design**: Mobile-friendly interface with accessible components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Neon.tech PostgreSQL database account
- Clerk account (free tier available)
- Google Gemini API key

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database (Neon PostgreSQL)
DATABASE_URL=your_neon_postgresql_connection_string

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Next.js Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

3. Set up the database:

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel Deployment

#### Prerequisites

1. **Environment Variables**: Set all environment variables in Vercel dashboard (Settings → Environment Variables)
2. **Clerk Configuration**: Add your Vercel domain to Clerk's allowed origins
3. **Database**: Ensure Neon database is accessible from Vercel's IP ranges

#### Build Configuration

The project includes automatic Prisma Client generation:

- `postinstall` script runs `prisma generate` after npm install
- `build` script includes `prisma generate && next build` as fallback
- Prisma is included in `dependencies` (not `devDependencies`) for Vercel builds

#### Deployment Steps

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

Vercel will automatically:
- Install dependencies (triggers `postinstall` → Prisma generate)
- Run build script (includes Prisma generate as fallback)
- Deploy to production

#### Common Deployment Issues

**Issue: Prisma Client not found during build**

**Solution**: Ensure `prisma` is in `dependencies` (not `devDependencies`) and `postinstall` script is present in `package.json`.

**Issue: Middleware invocation failed (500 error)**

**Solution**: 
- Verify all Clerk environment variables are set in Vercel
- Check that Clerk domain is whitelisted in Clerk dashboard
- Ensure middleware always returns a response (see `middleware.ts`)

**Issue: Database connection errors**

**Solution**:
- Verify `DATABASE_URL` is set correctly in Vercel
- Check Neon database allows connections from Vercel
- Ensure connection string includes `?sslmode=require`

**Issue: API routes returning 401 errors**

**Solution**:
- Verify `CLERK_SECRET_KEY` is set (not just publishable key)
- Check that API routes use `auth()` from `@clerk/nextjs/server`
- Ensure middleware is not blocking API routes incorrectly

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── symptoms/
│   │   │   └── route.ts          # Symptom logging with weather integration
│   │   └── ai-summary/
│   │       └── route.ts          # AI summary generation endpoint
│   ├── dashboard/
│   │   ├── layout.tsx            # Dashboard layout wrapper
│   │   ├── page.tsx              # Main dashboard with stats and charts
│   │   ├── log/
│   │   │   └── page.tsx           # Symptom logging form
│   │   └── reports/
│   │       └── page.tsx          # AI summary generation UI
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx          # Clerk sign-in page
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx          # Clerk sign-up page
│   ├── globals.css               # Global styles and theme
│   ├── layout.tsx                # Root layout with ClerkProvider
│   └── page.tsx                  # Landing page
├── components/
│   ├── ui/                       # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   └── textarea.tsx
│   ├── dashboard-layout.tsx      # Sidebar navigation layout
│   ├── severity-chart.tsx        # Recharts visualization component
│   └── symptom-log-feed.tsx     # Symptom log display component
├── lib/
│   ├── prisma.ts                 # Prisma Client singleton instance
│   └── utils.ts                  # Utility functions (cn helper)
├── prisma/
│   ├── schema.prisma             # Database schema definition
│   └── migrations/              # Database migration files
├── middleware.ts                 # Clerk authentication middleware
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── package.json                  # Dependencies and scripts
```

## Key Design Decisions

### Server-Side Rendering

All dashboard pages use Next.js server components for:
- Direct database queries without API roundtrips
- Improved SEO and initial load performance
- Type-safe data fetching with Prisma

### Middleware Architecture

Clerk middleware handles:
- Route protection at the edge (before page load)
- Automatic redirects for authenticated/unauthenticated users
- Public route matching for sign-in/sign-up pages

### Database Design

- UUID primary keys for better distribution and security
- Indexed userId and createdAt for efficient queries
- Nullable weather fields (graceful degradation if API fails)
- Separate indexes for common query patterns

### Error Handling

- Middleware includes try-catch to prevent app crashes
- API routes return appropriate HTTP status codes
- Weather API failures don't block symptom logging
- AI summary generation includes error handling

### Security Considerations

- Environment variables for sensitive keys
- Server-side authentication checks in all API routes
- Protected routes via middleware
- Prisma parameterized queries prevent SQL injection

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

### Code Organization

- **API Routes**: Server-side logic in `app/api/`
- **Pages**: Server components in `app/` directory
- **Components**: Reusable UI components in `components/`
- **Utilities**: Shared functions in `lib/`
- **Database**: Schema and migrations in `prisma/`

## Troubleshooting

### Local Development Issues

**Prisma Client not found**
```bash
npm run prisma:generate
```

**Database connection errors**
- Verify `DATABASE_URL` in `.env.local`
- Check Neon database is running
- Ensure connection string format is correct

**Clerk authentication not working**
- Verify environment variables are set
- Check Clerk dashboard for correct URLs
- Ensure middleware is not blocking routes incorrectly

### Production Issues

See "Common Deployment Issues" section above for Vercel-specific problems.

## License

MIT

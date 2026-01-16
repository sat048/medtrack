# MedTrack Pro - Symptom Intelligence Dashboard

A full-stack medical symptom tracking application that correlates symptoms with weather data and generates AI-powered clinical summaries.

## Features

- 🔐 **Authentication**: Secure user authentication with Clerk
- 📊 **Symptom Logging**: Track symptoms with severity ratings and notes
- 🌤️ **Weather Integration**: Automatic weather data correlation via Open-Meteo API
- 📈 **Visualization**: Interactive charts showing severity trends over time
- 🤖 **AI Summaries**: Generate clinical summaries using Google Gemini API
- 🎨 **Modern UI**: Beautiful, accessible interface with Tailwind CSS and Shadcn UI

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Authentication**: Clerk
- **Database**: PostgreSQL (via Neon.tech)
- **ORM**: Prisma
- **APIs**: Open-Meteo (Weather), Google Gemini (AI)
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Neon.tech PostgreSQL database
- Clerk account (free tier)
- Google Gemini API key

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_neon_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
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

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── symptoms/        # Symptom logging API with weather integration
│   │   └── ai-summary/      # AI summary generation API
│   ├── dashboard/
│   │   ├── log/             # Symptom logging form
│   │   ├── reports/         # AI summary generation page
│   │   └── page.tsx         # Main dashboard
│   ├── sign-in/             # Clerk sign-in page
│   ├── sign-up/             # Clerk sign-up page
│   └── layout.tsx           # Root layout with Clerk provider
├── components/
│   ├── ui/                  # Shadcn UI components
│   ├── dashboard-layout.tsx # Dashboard sidebar layout
│   ├── symptom-log-feed.tsx # Symptom log display component
│   └── severity-chart.tsx   # Recharts visualization
├── lib/
│   ├── prisma.ts            # Prisma client instance
│   └── utils.ts             # Utility functions
└── prisma/
    └── schema.prisma        # Database schema
```

## Features Breakdown

### Phase 1: Authentication & Layout
- ✅ Clerk authentication setup
- ✅ Protected dashboard with sidebar navigation
- ✅ User profile button integration

### Phase 2: Smart Log Form
- ✅ Symptom type selection
- ✅ Severity slider (1-10)
- ✅ Notes field
- ✅ Automatic weather data fetching on submission

### Phase 3: Dashboard & Visualization
- ✅ Recent logs feed with weather icons
- ✅ Severity over time chart
- ✅ Statistics cards

### Phase 4: AI Doctor Report
- ✅ Generate clinical summary from last 10 logs
- ✅ Copy to clipboard functionality
- ✅ Modal display with formatted text

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

The app will automatically:
- Run Prisma migrations on build
- Generate Prisma Client
- Build and deploy

## License

MIT




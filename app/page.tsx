import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/scroll-animation"
import { DeviceMockup } from "@/components/device-mockup"
import { FeaturesSection } from "@/components/features-section"
import { 
  Activity, 
  Zap,
  LayoutDashboard,
  LogIn,
  HeartPulse,
  BarChart3,
  TrendingUp,
  Calendar
} from "lucide-react"

export default async function Home() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />

      {/* Ramp-style: Navigation with gradient fade */}
      <nav className="relative z-50 bg-gradient-to-b from-background via-background/95 to-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground tracking-tight leading-none">MedTrack Pro</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">Symptom Intelligence</span>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center gap-4">
              {userId ? (
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="border-border hover:border-primary/30 hover:bg-primary/5 font-medium transition-all duration-200 hover:scale-105">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="ghost" size="sm" className="font-medium hover:bg-muted/50 transition-all duration-200">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button size="sm" className="font-semibold transition-all duration-200 hover:scale-105 hover:shadow-elevated">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Side by side: Text left, Tablet right */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Text Content */}
          <div className="text-left">
            <ScrollAnimation>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-8 fade-in">
                <HeartPulse className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Symptom Intelligence Platform</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight fade-in reveal-delay-1">
                <span className="text-foreground">Track Your</span>
                <br />
                <span className="gradient-text">Health Patterns</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed fade-in reveal-delay-2">
                Correlate symptoms with weather data and generate data-driven clinical summaries for your healthcare provider.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 fade-in reveal-delay-3">
                {userId ? (
                  <Link href="/dashboard" className="w-full sm:w-auto">
                    <Button size="lg" className="text-base w-full sm:w-auto px-8 transition-all duration-200 hover:scale-105 hover:shadow-elevated">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-up" className="w-full sm:w-auto">
                      <Button size="lg" className="text-base w-full sm:w-auto px-8 transition-all duration-200 hover:scale-105 hover:shadow-elevated">
                        Start Tracking
                      </Button>
                    </Link>
                    <Link href="/sign-in" className="w-full sm:w-auto">
                      <Button size="lg" variant="outline" className="text-base w-full sm:w-auto px-8 transition-all duration-200 hover:scale-105">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Side: Device Mockup */}
          <div className="relative">
            <ScrollAnimation direction="up" delay={400}>
              <DeviceMockup type="tablet">
                {/* Dashboard Preview Content */}
                <div className="w-full h-full bg-gradient-to-br from-slate-50 to-white p-8">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-1">Dashboard</h2>
                        <p className="text-sm text-muted-foreground">Track and analyze your symptoms</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white rounded-xl border border-border p-4 shadow-soft">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground font-medium">Total Logs</span>
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-2xl font-semibold text-foreground">24</div>
                      </div>
                      <div className="bg-white rounded-xl border border-border p-4 shadow-soft">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground font-medium">Avg Severity</span>
                          <TrendingUp className="h-4 w-4 text-accent" />
                        </div>
                        <div className="text-2xl font-semibold text-foreground">5.2/10</div>
                      </div>
                      <div className="bg-white rounded-xl border border-border p-4 shadow-soft">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground font-medium">Recent</span>
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-2xl font-semibold text-foreground">Today</div>
                      </div>
                    </div>

                    {/* Chart Preview */}
                    <div className="bg-white rounded-xl border border-border p-6 shadow-soft">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Severity Over Time</h3>
                      <div className="h-32 bg-gradient-to-t from-primary/10 to-transparent rounded-lg flex items-end justify-around gap-2 p-2">
                        {[3, 5, 4, 6, 5, 7, 6].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t"
                            style={{ height: `${(height / 7) * 100}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DeviceMockup>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section - Ramp style: Clean, minimal */}
      <section className="relative z-10 bg-muted/30 border-y border-border py-24">
        <ScrollAnimation direction="scale" delay={200}>
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
            <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-2xl mb-8 shadow-soft transition-transform duration-200 hover:scale-110">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-foreground">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl mb-10 text-muted-foreground">
              Join MedTrack Pro today and start tracking your symptoms with intelligent insights.
            </p>
            {!userId && (
              <Link href="/sign-up" className="inline-block">
                <Button size="lg" className="text-base px-8 transition-all duration-200 hover:scale-105 hover:shadow-elevated">
                  Get Started Free
                </Button>
              </Link>
            )}
          </div>
        </ScrollAnimation>
      </section>

      {/* Footer - Ramp style: Minimal */}
      <footer className="relative z-10 border-t border-border bg-background py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">MedTrack Pro</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MedTrack Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

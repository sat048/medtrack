import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ScrollGradient } from "@/components/scroll-gradient"
import { FeaturesSection } from "@/components/features-section"
import { 
  Activity, 
  Zap,
  LayoutDashboard,
  LogIn,
  HeartPulse
} from "lucide-react"

export default async function Home() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-atmospheric bg-medical-pattern relative overflow-hidden">
      {/* Expanding gradient background that grows on scroll */}
      <ScrollGradient />

      {/* Professional Navigation Header */}
      <nav className="relative z-50 border-b border-primary/10 bg-card/40 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                  <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-none">MedTrack Pro</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">Symptom Intelligence</span>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center gap-3">
              {userId ? (
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary/50 hover:bg-primary/10 font-semibold">
                    <LayoutDashboard className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Dashboard</span>
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm font-semibold hover:bg-primary/10 hover:text-primary">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button size="sm" className="text-xs sm:text-sm font-bold px-4 sm:px-5">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-12 sm:pb-24">
        <ScrollAnimation>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/30 mb-6 sm:mb-8">
              <HeartPulse className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-foreground">Symptom Intelligence Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight px-4">
              <span className="text-foreground">Track Your</span>
              <br />
              <span className="gradient-text">Health Patterns</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4">
              Correlate symptoms with weather data and generate data-driven clinical summaries for your healthcare provider.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              {userId ? (
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="text-sm sm:text-base w-full sm:w-auto">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/sign-up" className="w-full sm:w-auto">
                    <Button size="lg" className="text-sm sm:text-base w-full sm:w-auto">
                      Start Tracking
                    </Button>
                  </Link>
                  <Link href="/sign-in" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="text-sm sm:text-base w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Features Section - Interactive Cards */}
      <FeaturesSection />

      {/* CTA Section */}
      <section className="relative z-10 glass border-y border-primary/20 py-12 sm:py-24">
        <ScrollAnimation direction="scale" delay={200}>
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 gradient-primary rounded-full mb-4 sm:mb-6 shadow-soft pulse-teal">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight text-foreground px-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-10 text-muted-foreground px-4">
              Join MedTrack Pro today and start tracking your symptoms with intelligent insights.
            </p>
            {!userId && (
              <Link href="/sign-up" className="inline-block">
                <Button size="lg" className="text-sm sm:text-base">
                  Get Started Free
                </Button>
              </Link>
            )}
          </div>
        </ScrollAnimation>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/20 glass py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-base sm:text-lg font-bold text-foreground">MedTrack Pro</span>
          </div>
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} MedTrack Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

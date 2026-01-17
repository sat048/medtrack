import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Activity, 
  BarChart3, 
  Cloud, 
  FileText, 
  Shield, 
  Sparkles,
  TrendingUp,
  Zap,
  LayoutDashboard,
  LogIn,
  HeartPulse
} from "lucide-react"

export default async function Home() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-medical-gradient bg-pattern relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Activity className="h-8 w-8 text-primary pulse-cyan" />
                <div className="absolute inset-0 text-primary blur-xl opacity-50"></div>
              </div>
              <span className="text-2xl font-bold text-gradient-cyan">MedTrack Pro</span>
            </div>
            <div className="flex items-center gap-4">
              {userId ? (
                <Link href="/dashboard">
                  <Button variant="ghost" className="gap-2 hover:bg-primary/10 hover:text-primary transition-colors">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="ghost" className="gap-2 hover:bg-primary/10 hover:text-primary transition-colors">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan transition-all">
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
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 reveal reveal-delay-1">
            <HeartPulse className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Symptom Intelligence Platform</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 reveal reveal-delay-2">
            <span className="text-foreground">Track Your</span>
            <br />
            <span className="text-gradient-cyan">Health Patterns</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed reveal reveal-delay-3">
            Correlate symptoms with weather data and generate AI-powered clinical summaries for your healthcare provider.
          </p>
          <div className="flex gap-4 justify-center reveal reveal-delay-4">
            {userId ? (
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-10 py-7 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan transition-all hover-lift">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/sign-up">
                  <Button size="lg" className="text-lg px-10 py-7 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan transition-all hover-lift">
                    Start Tracking
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-border/50 hover:bg-card hover:border-primary/50 transition-all hover-lift">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand your symptoms and share insights with your doctor
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: FileText, title: "Smart Symptom Logging", desc: "Easily log symptoms with severity ratings and detailed notes. Our system automatically captures weather data for correlation analysis.", delay: "0.1s" },
            { icon: Cloud, title: "Weather Correlation", desc: "Automatically track temperature, humidity, and weather conditions alongside your symptoms to identify environmental triggers.", delay: "0.2s" },
            { icon: BarChart3, title: "Visual Analytics", desc: "Interactive charts and graphs help you visualize symptom patterns, severity trends, and correlations over time.", delay: "0.3s" },
            { icon: Sparkles, title: "AI-Powered Summaries", desc: "Generate professional clinical summaries using AI. Perfect for sharing with your healthcare provider during appointments.", delay: "0.4s" },
            { icon: Shield, title: "Secure & Private", desc: "Your health data is encrypted and secure. Only you have access to your symptom logs and personal information.", delay: "0.5s" },
            { icon: TrendingUp, title: "Track Trends", desc: "Identify patterns and trends in your symptoms. Understand what triggers your conditions and track improvements over time.", delay: "0.6s" },
          ].map((feature, index) => (
            <div 
              key={feature.title}
              className="group bg-card border border-border/50 p-8 rounded-xl hover-lift reveal"
              style={{ animationDelay: feature.delay }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-y border-primary/20 py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6 reveal">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground reveal reveal-delay-1">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-10 text-muted-foreground reveal reveal-delay-2">
            Join MedTrack Pro today and start tracking your symptoms with intelligent insights.
          </p>
          {!userId && (
            <Link href="/sign-up" className="reveal reveal-delay-3 inline-block">
              <Button size="lg" className="text-lg px-10 py-7 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan transition-all hover-lift">
                Get Started Free
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/30 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-gradient-cyan">MedTrack Pro</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MedTrack Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { ScrollAnimation } from "@/components/scroll-animation"
import { FeatureCard } from "@/components/feature-card"
import { 
  BarChart3, 
  Cloud, 
  FileText, 
  Shield, 
  Sparkles,
  TrendingUp,
} from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Smart Symptom Logging",
    description: "Easily log symptoms with severity ratings and detailed notes.",
    details: "Our intelligent system automatically captures weather data for correlation analysis, helping you identify patterns you might miss. Each entry is timestamped and linked to environmental conditions.",
    delay: 0,
  },
  {
    icon: Cloud,
    title: "Weather Correlation",
    description: "Automatically track temperature, humidity, and weather conditions.",
    details: "Every symptom log includes real-time weather data from your location. Our system identifies correlations between environmental factors and your symptoms, revealing potential triggers like high humidity or temperature changes.",
    delay: 100,
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Interactive charts and graphs visualize symptom patterns.",
    details: "Track severity trends over time with beautiful, interactive visualizations. Spot patterns, identify improvement periods, and understand your symptom cycles at a glance.",
    delay: 200,
  },
  {
    icon: Sparkles,
    title: "Data-Driven Summaries",
    description: "Generate comprehensive statistical summaries for doctors.",
    details: "Create professional reports with frequency analysis, severity trends, and weather correlations. Perfect for sharing with healthcare providers during appointments - no AI costs, just pure data insights.",
    delay: 300,
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health data is encrypted and secure.",
    details: "We use industry-standard encryption to protect your sensitive health information. Your data is stored securely and only accessible to you. We never share your information with third parties.",
    delay: 400,
  },
  {
    icon: TrendingUp,
    title: "Track Trends",
    description: "Identify patterns and trends in your symptoms.",
    details: "Understand what triggers your conditions and track improvements over time. Our analytics help you recognize patterns that might not be immediately obvious, empowering you to make informed health decisions.",
    delay: 500,
  },
]

export function FeaturesSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
      <ScrollAnimation direction="up" delay={100}>
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight text-foreground">
            Powerful Features
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Everything you need to understand your symptoms and share insights with your doctor
          </p>
        </div>
      </ScrollAnimation>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature) => (
          <ScrollAnimation 
            key={feature.title}
            direction="up" 
            delay={feature.delay}
          >
            <FeatureCard {...feature} />
          </ScrollAnimation>
        ))}
      </div>
    </section>
  )
}

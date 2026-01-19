"use client"

import { useState } from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  details?: string
  delay?: number
}

export function FeatureCard({ icon: Icon, title, description, details, delay = 0 }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "relative h-full p-8 rounded-xl border border-border transition-all duration-300 cursor-pointer bg-card",
          "hover:border-primary/30 hover:shadow-elevated active:scale-[0.99]",
          isHovered && "scale-[1.01]"
        )}
        style={{
          transform: isHovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        }}
      >
        {/* Micro-interaction: Subtle glow on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100"
          )}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon - Ramp style: Clean, minimal with hover effect */}
          <div className="mb-6">
            <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center shadow-soft transition-all duration-300 group-hover:scale-110 group-hover:shadow-elevated">
              <Icon className="h-6 w-6 text-white transition-transform duration-300 group-hover:rotate-3" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-3 transition-colors duration-300 tracking-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            {description}
          </p>

          {/* Expandable details */}
          {details && (
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-out",
                isHovered ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {details}
                </p>
              </div>
            </div>
          )}

          {/* Learn more indicator - Ramp style: Subtle with smooth animation */}
          <div className="flex items-center gap-2 mt-4 text-sm font-medium text-primary">
            <span className={cn(
              "transition-all duration-300",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            )}>
              Learn more
            </span>
            <span className={cn(
              "transition-transform duration-300",
              isHovered && "translate-x-1"
            )}>
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

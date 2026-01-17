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
          "relative h-full p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-primary/20 transition-all duration-500 ease-out cursor-pointer",
          "glass-card",
          "hover:border-primary/40 hover:shadow-elevated active:scale-[0.98]",
          isHovered && "scale-[1.02]"
        )}
        style={{
          transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        }}
      >
        {/* Animated background gradient on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500",
            isHovered && "opacity-100"
          )}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with animated glow */}
          <div className="mb-4 sm:mb-6 relative">
            <div
              className={cn(
                "w-12 h-12 sm:w-14 sm:h-14 gradient-primary rounded-xl flex items-center justify-center shadow-soft transition-all duration-500",
                isHovered && "scale-110 shadow-elevated"
              )}
            >
              <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white transition-transform duration-500" 
                    style={{ transform: isHovered ? "rotate(5deg) scale(1.1)" : "rotate(0) scale(1)" }} />
            </div>
            {/* Glow effect */}
            <div
              className={cn(
                "absolute inset-0 bg-primary/30 rounded-xl blur-xl -z-10 transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 transition-colors duration-300 tracking-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
            {description}
          </p>

          {/* Expandable details */}
          {details && (
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-out",
                isHovered ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="pt-3 sm:pt-4 border-t border-primary/20">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {details}
                </p>
              </div>
            </div>
          )}

          {/* Learn more indicator */}
          <div className="flex items-center gap-2 mt-3 sm:mt-4 text-xs sm:text-sm font-bold text-primary">
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

        {/* Decorative corner accent */}
        <div
          className={cn(
            "absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/15 to-transparent rounded-bl-xl sm:rounded-bl-2xl rounded-tr-xl sm:rounded-tr-2xl transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
    </div>
  )
}

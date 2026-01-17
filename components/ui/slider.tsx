import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  value?: number
  onValueChange?: (value: number) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    return (
      <input
        type="range"
        className={cn(
          "w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/20",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-soft [&::-webkit-slider-thumb]:hover:scale-110",
          "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-soft",
          className
        )}
        ref={ref}
        value={value}
        onChange={(e) => onValueChange?.(Number(e.target.value))}
        {...props}
      />
    )
  }
)
Slider.displayName = "Slider"

export { Slider }

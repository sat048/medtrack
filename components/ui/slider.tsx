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
          "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary",
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




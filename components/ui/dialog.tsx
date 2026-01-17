import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-2xl animate-scale-in">
        {children}
      </div>
    </div>
  )
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass-card rounded-xl sm:rounded-2xl shadow-elevated p-4 sm:p-6 w-full max-h-[90vh] overflow-y-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="flex flex-col space-y-2 mb-4 sm:mb-6" {...props}>
    {children}
  </div>
)

const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-xl sm:text-2xl font-semibold text-foreground tracking-tight", className)} {...props} />
)

const DialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-xs sm:text-sm text-muted-foreground leading-relaxed", className)} {...props} />
)

const DialogClose = ({ onClose }: { onClose: () => void }) => (
  <Button
    variant="ghost"
    size="icon"
    className="absolute right-3 sm:right-4 top-3 sm:top-4 h-8 w-8 sm:h-10 sm:w-10 rounded-lg hover:bg-muted/50 min-h-[44px] min-w-[44px]"
    onClick={onClose}
  >
    <X className="h-4 w-4 sm:h-5 sm:w-5" />
  </Button>
)

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose }

"use client"

import { useState } from "react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Activity, Home, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Log Symptom", href: "/dashboard/log", icon: FileText },
  { name: "Reports", href: "/dashboard/reports", icon: Activity },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Mobile Menu Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Ramp style: Clean, minimal */}
        <aside
          className={cn(
            "fixed lg:static inset-y-0 left-0 z-50 border-r border-border bg-background flex flex-col transition-transform duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            "w-64"
          )}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-4 group flex-1" onClick={() => setSidebarOpen(false)}>
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-bold text-foreground tracking-tight leading-none">MedTrack Pro</h1>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">Symptom Intelligence</p>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth min-h-[44px] font-semibold",
                    isActive
                      ? "gradient-primary text-white shadow-soft"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              )
            })}
            <Link href="/" className="mt-4" onClick={() => setSidebarOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 min-h-[44px] font-semibold">
                <Home className="h-5 w-5" />
                <span className="text-sm">Back to Home</span>
              </Button>
            </Link>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Account</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background w-full">
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="min-h-[44px] min-w-[44px]"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground tracking-tight leading-none">MedTrack Pro</span>
                <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">Symptom Intelligence</span>
              </div>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

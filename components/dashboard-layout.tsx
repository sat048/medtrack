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
    <div className="min-h-screen bg-atmospheric bg-medical-pattern">
      <div className="flex h-screen">
        {/* Mobile Menu Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Professional Style */}
        <aside
          className={cn(
            "fixed lg:static inset-y-0 left-0 z-50 border-r border-primary/10 bg-card/40 backdrop-blur-xl flex flex-col transition-transform duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            "w-64"
          )}
        >
          {/* Sidebar Header */}
          <div className="p-5 lg:p-6 border-b border-primary/10 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3 group flex-1" onClick={() => setSidebarOpen(false)}>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
                  <Activity className="h-5 w-5 text-white" />
                </div>
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
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth min-h-[44px] font-semibold relative group",
                    isActive
                      ? "gradient-primary text-white shadow-soft"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/30 rounded-r-full"></div>
                  )}
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                    isActive ? "scale-110" : "group-hover:scale-105"
                  )} />
                  <span className="text-sm">{item.name}</span>
                </Link>
              )
            })}
            <Link href="/" className="mt-4" onClick={() => setSidebarOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-primary/10 min-h-[44px] font-semibold">
                <Home className="h-5 w-5" />
                <span className="text-sm">Back to Home</span>
              </Button>
            </Link>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-primary/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Account</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-atmospheric bg-medical-pattern w-full">
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 z-30 border-b border-primary/10 bg-card/40 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
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
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

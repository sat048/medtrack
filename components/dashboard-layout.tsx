"use client"

import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Activity, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Log Symptom", href: "/dashboard/log", icon: FileText },
  { name: "Reports", href: "/dashboard/reports", icon: Activity },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-medical-gradient bg-pattern">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-72 bg-card/50 backdrop-blur-xl border-r border-border/50 flex flex-col relative z-10">
          <div className="p-6 border-b border-border/50">
            <Link href="/dashboard" className="flex items-center gap-3 mb-2 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform glow-cyan">
                  <Activity className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient-cyan">MedTrack Pro</h1>
                <p className="text-xs text-muted-foreground">Symptom Intelligence</p>
              </div>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover-lift reveal",
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg glow-cyan"
                      : "text-muted-foreground hover:bg-card hover:text-foreground border border-transparent hover:border-border/50"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-transform",
                    isActive && "scale-110"
                  )} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
            <Link href="/" className="mt-6">
              <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border/50 transition-all hover-lift">
                <Home className="h-5 w-5" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </nav>
          <div className="p-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium">Account</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative">
          <div className="absolute inset-0 bg-medical-gradient bg-pattern opacity-30"></div>
          <div className="relative z-10 p-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

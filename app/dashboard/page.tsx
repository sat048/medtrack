import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SymptomLogFeed } from "@/components/symptom-log-feed"
import { SeverityChart } from "@/components/severity-chart"
import { format } from "date-fns"
import { Activity, TrendingUp, Calendar } from "lucide-react"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/")
  }

  const logs = await prisma.symptomLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
  })

  const chartData = await prisma.symptomLog.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
    take: 30,
  })

  const totalLogs = await prisma.symptomLog.count({
    where: { userId },
  })

  const avgSeverity =
    logs.length > 0
      ? Math.round(
          logs.reduce((sum, log) => sum + log.severity, 0) / logs.length
        )
      : 0

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Track and analyze your symptoms</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="hover-lift fade-in">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Total Logs
            </CardTitle>
            <div className="w-8 h-8 sm:w-10 sm:h-10 gradient-primary rounded-lg flex items-center justify-center shadow-soft">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{totalLogs}</div>
            <p className="text-xs text-muted-foreground">All time entries</p>
          </CardContent>
        </Card>
        <Card className="hover-lift fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Average Severity
            </CardTitle>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
              {avgSeverity}/10
            </div>
            <p className="text-xs text-muted-foreground">Last 10 entries</p>
          </CardContent>
        </Card>
        <Card className="hover-lift fade-in sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Recent Activity
            </CardTitle>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              {logs.length > 0
                ? format(new Date(logs[0].createdAt), "MMM d, yyyy")
                : "No logs yet"}
            </div>
            <p className="text-xs text-muted-foreground">Last logged</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="fade-in" style={{ animationDelay: '0.3s' }}>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">Severity Over Time</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Track your symptom severity trends</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <SeverityChart data={chartData} />
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card className="fade-in" style={{ animationDelay: '0.4s' }}>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">Recent Symptom Logs</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Your latest entries</CardDescription>
        </CardHeader>
        <CardContent>
          <SymptomLogFeed logs={logs} />
        </CardContent>
      </Card>
    </div>
  )
}

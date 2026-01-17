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
    <div className="space-y-8">
      <div className="reveal">
        <h1 className="text-5xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Track and analyze your symptoms</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover-lift reveal reveal-delay-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Logs
            </CardTitle>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-gradient-cyan">{totalLogs}</div>
            <p className="text-xs text-muted-foreground mt-2">All time entries</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover-lift reveal reveal-delay-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Severity
            </CardTitle>
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-gradient-emerald">
              {avgSeverity}/10
            </div>
            <p className="text-xs text-muted-foreground mt-2">Last 10 entries</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover-lift reveal reveal-delay-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recent Activity
            </CardTitle>
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {logs.length > 0
                ? format(new Date(logs[0].createdAt), "MMM d, yyyy")
                : "No logs yet"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Last logged</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 reveal reveal-delay-4">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Severity Over Time</CardTitle>
          <CardDescription className="text-muted-foreground">Track your symptom severity trends</CardDescription>
        </CardHeader>
        <CardContent>
          <SeverityChart data={chartData} />
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 reveal reveal-delay-5">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Recent Symptom Logs</CardTitle>
          <CardDescription className="text-muted-foreground">Your latest entries</CardDescription>
        </CardHeader>
        <CardContent>
          <SymptomLogFeed logs={logs} />
        </CardContent>
      </Card>
    </div>
  )
}

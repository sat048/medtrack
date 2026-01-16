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
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Track and analyze your symptoms</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Logs
            </CardTitle>
            <Activity className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">{totalLogs}</div>
            <p className="text-xs text-gray-500 mt-1">All time entries</p>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Severity
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-teal-600">
              {avgSeverity}/10
            </div>
            <p className="text-xs text-gray-500 mt-1">Last 10 entries</p>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Recent Activity
            </CardTitle>
            <Calendar className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {logs.length > 0
                ? format(new Date(logs[0].createdAt), "MMM d, yyyy")
                : "No logs yet"}
            </div>
            <p className="text-xs text-gray-500 mt-1">Last logged</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Severity Over Time</CardTitle>
          <CardDescription>Track your symptom severity trends</CardDescription>
        </CardHeader>
        <CardContent>
          <SeverityChart data={chartData} />
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Recent Symptom Logs</CardTitle>
          <CardDescription>Your latest entries</CardDescription>
        </CardHeader>
        <CardContent>
          <SymptomLogFeed logs={logs} />
        </CardContent>
      </Card>
    </div>
  )
}

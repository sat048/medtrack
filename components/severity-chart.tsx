"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format } from "date-fns"

interface ChartData {
  id: string
  severity: number
  createdAt: Date
}

export function SeverityChart({ data }: { data: ChartData[] }) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data available yet
      </div>
    )
  }

  const chartData = data.map((log) => ({
    date: format(new Date(log.createdAt), "MMM d"),
    severity: log.severity,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="severity"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={{ fill: "#0ea5e9", r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}




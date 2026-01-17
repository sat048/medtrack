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
      <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
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
      <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" opacity={0.2} />
        <XAxis 
          dataKey="date" 
          stroke="rgb(var(--muted-foreground))"
          style={{ fontSize: '11px' }}
          tick={{ fill: 'rgb(var(--muted-foreground))' }}
        />
        <YAxis 
          domain={[0, 10]} 
          stroke="rgb(var(--muted-foreground))"
          style={{ fontSize: '11px' }}
          tick={{ fill: 'rgb(var(--muted-foreground))' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgb(var(--card))',
            border: '1px solid rgb(var(--border))',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
          }}
          labelStyle={{ color: 'rgb(var(--foreground))', fontWeight: 600 }}
        />
        <Line
          type="monotone"
          dataKey="severity"
          stroke="rgb(var(--primary))"
          strokeWidth={2.5}
          dot={{ fill: "rgb(var(--primary))", r: 3, strokeWidth: 2 }}
          activeDot={{ r: 5, stroke: "rgb(var(--primary))", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

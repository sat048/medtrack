import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch all logs for the user
    const logs = await prisma.symptomLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    if (logs.length === 0) {
      return NextResponse.json(
        { error: "No symptom logs found" },
        { status: 400 }
      )
    }

    // Calculate statistics
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const recentLogs = logs.filter(log => new Date(log.createdAt) >= thirtyDaysAgo)
    const allTimeLogs = logs

    // Most frequent symptom
    const symptomCounts: Record<string, number> = {}
    recentLogs.forEach(log => {
      symptomCounts[log.symptomType] = (symptomCounts[log.symptomType] || 0) + 1
    })
    const mostFrequent = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1])[0]

    // Average severity by symptom type
    const severityBySymptom: Record<string, { total: number; count: number }> = {}
    recentLogs.forEach(log => {
      if (!severityBySymptom[log.symptomType]) {
        severityBySymptom[log.symptomType] = { total: 0, count: 0 }
      }
      severityBySymptom[log.symptomType].total += log.severity
      severityBySymptom[log.symptomType].count += 1
    })
    const avgSeverityBySymptom = Object.entries(severityBySymptom).map(([symptom, data]) => ({
      symptom,
      average: Math.round((data.total / data.count) * 10) / 10,
      count: data.count
    })).sort((a, b) => b.count - a.count)

    // Overall average severity
    const totalSeverity = recentLogs.reduce((sum, log) => sum + log.severity, 0)
    const avgSeverity = recentLogs.length > 0 ? Math.round((totalSeverity / recentLogs.length) * 10) / 10 : 0

    // Severity trend (compare last 30 days to previous 30 days)
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)
    const previousPeriodLogs = logs.filter(log => {
      const logDate = new Date(log.createdAt)
      return logDate >= sixtyDaysAgo && logDate < thirtyDaysAgo
    })
    const previousAvgSeverity = previousPeriodLogs.length > 0
      ? previousPeriodLogs.reduce((sum, log) => sum + log.severity, 0) / previousPeriodLogs.length
      : avgSeverity
    const severityTrend = avgSeverity > previousAvgSeverity ? 'increasing' : avgSeverity < previousAvgSeverity ? 'decreasing' : 'stable'
    const severityTrendPercent = previousAvgSeverity > 0
      ? Math.round(((avgSeverity - previousAvgSeverity) / previousAvgSeverity) * 100)
      : 0

    // Weather correlations
    const weatherCorrelations: Array<{
      symptom: string
      condition: string
      correlation: number
      description: string
    }> = []

    // Temperature correlations
    const tempThreshold = 24 // Celsius
    Object.keys(symptomCounts).forEach(symptom => {
      const symptomLogs = recentLogs.filter(log => log.symptomType === symptom && log.temperature !== null)
      if (symptomLogs.length >= 3) {
        const highTempLogs = symptomLogs.filter(log => (log.temperature || 0) > tempThreshold)
        const correlation = Math.round((highTempLogs.length / symptomLogs.length) * 100)
        if (correlation >= 50) {
          weatherCorrelations.push({
            symptom,
            condition: `Temperature > ${tempThreshold}°C`,
            correlation,
            description: `${correlation}% occur when temperature > ${tempThreshold}°C`
          })
        }
      }
    })

    // Humidity correlations
    const humidityThreshold = 70
    Object.keys(symptomCounts).forEach(symptom => {
      const symptomLogs = recentLogs.filter(log => log.symptomType === symptom && log.humidity !== null)
      if (symptomLogs.length >= 3) {
        const highHumidityLogs = symptomLogs.filter(log => (log.humidity || 0) > humidityThreshold)
        const correlation = Math.round((highHumidityLogs.length / symptomLogs.length) * 100)
        if (correlation >= 50) {
          weatherCorrelations.push({
            symptom,
            condition: `Humidity > ${humidityThreshold}%`,
            correlation,
            description: `${correlation}% occur when humidity > ${humidityThreshold}%`
          })
        }
      }
    })

    // Time-based patterns
    const dayOfWeekCounts: Record<string, number> = {}
    const hourCounts: Record<number, number> = {}
    recentLogs.forEach(log => {
      const date = new Date(log.createdAt)
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
      dayOfWeekCounts[dayName] = (dayOfWeekCounts[dayName] || 0) + 1
      const hour = date.getHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })
    const peakDay = Object.entries(dayOfWeekCounts).sort((a, b) => b[1] - a[1])[0]
    const peakHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0]

    // Severity breakdown
    const severityBreakdown = {
      mild: recentLogs.filter(log => log.severity <= 3).length,
      moderate: recentLogs.filter(log => log.severity > 3 && log.severity <= 6).length,
      severe: recentLogs.filter(log => log.severity > 6).length
    }
    const totalRecent = recentLogs.length
    const severityPercentages = {
      mild: totalRecent > 0 ? Math.round((severityBreakdown.mild / totalRecent) * 100) : 0,
      moderate: totalRecent > 0 ? Math.round((severityBreakdown.moderate / totalRecent) * 100) : 0,
      severe: totalRecent > 0 ? Math.round((severityBreakdown.severe / totalRecent) * 100) : 0
    }

    return NextResponse.json({
      period: "Last 30 Days",
      totalEntries: recentLogs.length,
      allTimeEntries: allTimeLogs.length,
      mostFrequent: {
        symptom: mostFrequent[0],
        count: mostFrequent[1]
      },
      averageSeverity: avgSeverity,
      severityTrend: {
        direction: severityTrend,
        percent: Math.abs(severityTrendPercent),
        previousAverage: Math.round(previousAvgSeverity * 10) / 10
      },
      avgSeverityBySymptom: avgSeverityBySymptom,
      weatherCorrelations: weatherCorrelations.slice(0, 5), // Top 5
      timePatterns: {
        peakDay: peakDay ? { day: peakDay[0], count: peakDay[1] } : null,
        peakHour: peakHour ? { hour: parseInt(peakHour[0]), count: peakHour[1] } : null
      },
      severityBreakdown: {
        counts: severityBreakdown,
        percentages: severityPercentages
      }
    })
  } catch (error) {
    console.error("Error generating statistics:", error)
    return NextResponse.json(
      { error: "Failed to generate statistics" },
      { status: 500 }
    )
  }
}


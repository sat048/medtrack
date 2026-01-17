"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, Calendar, Clock, Cloud, BarChart3 } from "lucide-react"

interface Statistics {
  period: string
  totalEntries: number
  allTimeEntries: number
  mostFrequent: {
    symptom: string
    count: number
  }
  averageSeverity: number
  severityTrend: {
    direction: 'increasing' | 'decreasing' | 'stable'
    percent: number
    previousAverage: number
  }
  avgSeverityBySymptom: Array<{
    symptom: string
    average: number
    count: number
  }>
  weatherCorrelations: Array<{
    symptom: string
    condition: string
    correlation: number
    description: string
  }>
  timePatterns: {
    peakDay: { day: string; count: number } | null
    peakHour: { hour: number; count: number } | null
  }
  severityBreakdown: {
    counts: {
      mild: number
      moderate: number
      severe: number
    }
    percentages: {
      mild: number
      moderate: number
      severe: number
    }
  }
}

export function DataSummary({ stats }: { stats: Statistics }) {
  const getTrendIcon = () => {
    switch (stats.severityTrend.direction) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      default:
        return <Minus className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
    }
  }

  const getTrendColor = () => {
    switch (stats.severityTrend.direction) {
      case 'increasing':
        return 'text-destructive'
      case 'decreasing':
        return 'text-primary'
      default:
        return 'text-muted-foreground'
    }
  }

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:00 ${period}`
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="hover-lift fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Most Frequent Symptom</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              {stats.mostFrequent.symptom}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {stats.mostFrequent.count} occurrence{stats.mostFrequent.count !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Average Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-1">
              <div className="text-2xl sm:text-3xl font-bold text-foreground">
                {stats.averageSeverity}/10
              </div>
              {getTrendIcon()}
            </div>
            <p className={`text-xs sm:text-sm font-medium ${getTrendColor()}`}>
              {stats.severityTrend.direction === 'increasing' && '⬆️ '}
              {stats.severityTrend.direction === 'decreasing' && '⬇️ '}
              {stats.severityTrend.direction === 'stable' && '➡️ '}
              {stats.severityTrend.direction === 'increasing' ? 'Increasing' : 
               stats.severityTrend.direction === 'decreasing' ? 'Decreasing' : 'Stable'}
              {stats.severityTrend.percent > 0 && ` (${stats.severityTrend.percent}%)`}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift fade-in sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              {stats.totalEntries}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {stats.period} • {stats.allTimeEntries} all-time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Severity by Symptom */}
      <Card className="fade-in" style={{ animationDelay: '0.3s' }}>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-2 tracking-tight">
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Average Severity by Symptom
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Sorted by frequency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 sm:space-y-3">
            {stats.avgSeverityBySymptom.map((item, index) => (
              <div key={item.symptom} className="flex items-center justify-between p-3 sm:p-4 glass rounded-lg border border-border/50 hover-lift fade-in" style={{ animationDelay: `${0.4 + index * 0.05}s` }}>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm sm:text-base text-foreground truncate">{item.symptom}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{item.count} occurrence{item.count !== 1 ? 's' : ''}</div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-primary ml-2 flex-shrink-0">
                  {item.average}/10
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Correlations */}
      {stats.weatherCorrelations.length > 0 && (
        <Card className="fade-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-2 tracking-tight">
              <Cloud className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              Weather Correlations
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Significant patterns detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {stats.weatherCorrelations.map((correlation, index) => (
                <div key={index} className="p-3 sm:p-4 glass rounded-lg border border-border/50 hover-lift fade-in" style={{ animationDelay: `${0.6 + index * 0.05}s` }}>
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <div className="font-semibold text-sm sm:text-base text-foreground flex-1">{correlation.symptom}</div>
                    <div className="text-base sm:text-lg font-bold text-accent flex-shrink-0">{correlation.correlation}%</div>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{correlation.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Time Patterns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {stats.timePatterns.peakDay && (
          <Card className="hover-lift fade-in" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2 tracking-tight">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Peak Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                {stats.timePatterns.peakDay.day}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {stats.timePatterns.peakDay.count} occurrence{stats.timePatterns.peakDay.count !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>
        )}

        {stats.timePatterns.peakHour && (
          <Card className="hover-lift fade-in" style={{ animationDelay: '0.7s' }}>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2 tracking-tight">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Peak Hour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                {formatHour(stats.timePatterns.peakHour.hour)}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {stats.timePatterns.peakHour.count} occurrence{stats.timePatterns.peakHour.count !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Severity Breakdown */}
      <Card className="fade-in" style={{ animationDelay: '0.8s' }}>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold tracking-tight">Severity Breakdown</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Distribution of symptom severity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-foreground">Mild (1-3)</span>
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  {stats.severityBreakdown.counts.mild} ({stats.severityBreakdown.percentages.mild}%)
                </span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2 sm:h-2.5 overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${stats.severityBreakdown.percentages.mild}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-foreground">Moderate (4-6)</span>
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  {stats.severityBreakdown.counts.moderate} ({stats.severityBreakdown.percentages.moderate}%)
                </span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2 sm:h-2.5 overflow-hidden">
                <div 
                  className="bg-accent h-full rounded-full transition-all duration-500"
                  style={{ width: `${stats.severityBreakdown.percentages.moderate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-foreground">Severe (7-10)</span>
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  {stats.severityBreakdown.counts.severe} ({stats.severityBreakdown.percentages.severe}%)
                </span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2 sm:h-2.5 overflow-hidden">
                <div 
                  className="bg-destructive h-full rounded-full transition-all duration-500"
                  style={{ width: `${stats.severityBreakdown.percentages.severe}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

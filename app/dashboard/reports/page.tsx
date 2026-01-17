"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Copy, Check, BarChart3, FileText, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { DataSummary } from "@/components/data-summary"

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

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Statistics | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [summaryText, setSummaryText] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/reports/stats")
      if (!response.ok) {
        throw new Error("Failed to fetch statistics")
      }
      const data = await response.json()
      setStats(data)
      generateSummaryText(data)
    } catch (error) {
      console.error("Error fetching statistics:", error)
      setError("Failed to load statistics. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const generateSummaryText = (data: Statistics) => {
    const lines: string[] = []
    
    lines.push(`Symptom Summary - ${data.period}`)
    lines.push("=".repeat(50))
    lines.push("")
    lines.push(`Total Entries: ${data.totalEntries} (${data.allTimeEntries} all-time)`)
    lines.push(`Most Frequent Symptom: ${data.mostFrequent.symptom} (${data.mostFrequent.count} occurrences)`)
    lines.push(`Average Severity: ${data.averageSeverity}/10`)
    lines.push(`Trend: ${data.severityTrend.direction.charAt(0).toUpperCase() + data.severityTrend.direction.slice(1)}${data.severityTrend.percent > 0 ? ` (${data.severityTrend.percent}% change)` : ''}`)
    lines.push("")
    
    lines.push("Average Severity by Symptom:")
    data.avgSeverityBySymptom.forEach(item => {
      lines.push(`  • ${item.symptom}: ${item.average}/10 (${item.count} occurrences)`)
    })
    lines.push("")
    
    if (data.weatherCorrelations.length > 0) {
      lines.push("Weather Correlations:")
      data.weatherCorrelations.forEach(corr => {
        lines.push(`  • ${corr.symptom}: ${corr.description}`)
      })
      lines.push("")
    }
    
    if (data.timePatterns.peakDay) {
      lines.push(`Peak Day: ${data.timePatterns.peakDay.day} (${data.timePatterns.peakDay.count} occurrences)`)
    }
    if (data.timePatterns.peakHour) {
      const hour = data.timePatterns.peakHour.hour
      const period = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
      lines.push(`Peak Hour: ${displayHour}:00 ${period} (${data.timePatterns.peakHour.count} occurrences)`)
    }
    lines.push("")
    
    lines.push("Severity Breakdown:")
    lines.push(`  • Mild (1-3): ${data.severityBreakdown.counts.mild} (${data.severityBreakdown.percentages.mild}%)`)
    lines.push(`  • Moderate (4-6): ${data.severityBreakdown.counts.moderate} (${data.severityBreakdown.percentages.moderate}%)`)
    lines.push(`  • Severe (7-10): ${data.severityBreakdown.counts.severe} (${data.severityBreakdown.percentages.severe}%)`)
    
    setSummaryText(lines.join("\n"))
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const copyToClipboard = async () => {
    if (summaryText) {
      await navigator.clipboard.writeText(summaryText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading statistics...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error || "No data available"}</p>
              <Button onClick={fetchStats} variant="outline" className="min-h-[44px]">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 sm:mb-8 fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-primary rounded-lg flex items-center justify-center shadow-soft">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1">Clinical Reports</h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Data-driven symptom analysis and statistics
              </p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={fetchStats}
              variant="outline"
              size="sm"
              className="min-h-[44px]"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              onClick={() => setDialogOpen(true)}
              size="sm"
              className="min-h-[44px]"
            >
              <FileText className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">View Text Summary</span>
              <span className="sm:hidden">Summary</span>
            </Button>
          </div>
        </div>
      </div>

      <DataSummary stats={stats} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              Text Summary
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Copy this summary to share with your healthcare provider
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {summaryText && (
              <>
                <div className="bg-muted/30 border border-border/50 p-4 sm:p-6 rounded-xl mb-4 whitespace-pre-wrap text-xs sm:text-sm leading-relaxed text-foreground font-mono overflow-x-auto">
                  {summaryText}
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="w-full min-h-[44px]"
                  size="lg"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-5 w-5 text-secondary" />
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-5 w-5" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
          <DialogClose onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

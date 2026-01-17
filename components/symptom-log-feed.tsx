import { Card } from "@/components/ui/card"
import { format } from "date-fns"
import { Cloud, Sun, CloudRain, CloudSnow, Thermometer, Droplets, Calendar } from "lucide-react"

const getWeatherIcon = (code?: number | null) => {
  if (!code) return <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
  
  // WMO Weather interpretation codes (Open-Meteo uses these)
  if (code === 0) return <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
  if (code >= 1 && code <= 3) return <Cloud className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
  if (code >= 45 && code <= 49) return <Cloud className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/70" />
  if (code >= 51 && code <= 67) return <CloudRain className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
  if (code >= 71 && code <= 77) return <CloudSnow className="h-4 w-4 sm:h-5 sm:w-5 text-primary/70" />
  if (code >= 80 && code <= 82) return <CloudRain className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
  if (code >= 85 && code <= 86) return <CloudSnow className="h-4 w-4 sm:h-5 sm:w-5 text-primary/70" />
  
  return <Cloud className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
}

const getSeverityColor = (severity: number) => {
  if (severity <= 3) return "bg-secondary/20 text-secondary border-secondary/30"
  if (severity <= 6) return "bg-accent/20 text-accent border-accent/30"
  return "bg-destructive/20 text-destructive border-destructive/30"
}

const getSeverityLabel = (severity: number) => {
  if (severity <= 3) return "Mild"
  if (severity <= 6) return "Moderate"
  return "Severe"
}

interface SymptomLog {
  id: string
  symptomType: string
  severity: number
  notes: string | null
  temperature: number | null
  humidity: number | null
  weatherCode: number | null
  createdAt: Date
}

export function SymptomLogFeed({ logs }: { logs: SymptomLog[] }) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12 fade-in">
        <div className="text-muted-foreground mb-4">
          <Calendar className="h-12 w-12 sm:h-16 sm:w-16 mx-auto opacity-50" />
        </div>
        <p className="text-foreground text-base sm:text-lg font-medium mb-1">No symptom logs yet</p>
        <p className="text-muted-foreground text-xs sm:text-sm">Start tracking your symptoms to see them here</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {logs.map((log, index) => (
        <Card 
          key={log.id} 
          className="p-4 sm:p-6 hover-lift fade-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <h3 className="font-semibold text-base sm:text-lg text-foreground">{log.symptomType}</h3>
                <span
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium border flex-shrink-0 ${getSeverityColor(
                    log.severity
                  )}`}
                >
                  {getSeverityLabel(log.severity)} - {log.severity}/10
                </span>
              </div>
              {log.notes && (
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 bg-muted/30 p-3 sm:p-4 rounded-lg border border-border/50 leading-relaxed">
                  {log.notes}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground whitespace-nowrap">
                    {format(new Date(log.createdAt), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                {log.temperature && (
                  <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                    <Thermometer className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                    <span className="text-foreground whitespace-nowrap">{log.temperature.toFixed(1)}°C</span>
                  </div>
                )}
                {log.humidity && (
                  <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                    <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground whitespace-nowrap">{log.humidity.toFixed(0)}%</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {getWeatherIcon(log.weatherCode)}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

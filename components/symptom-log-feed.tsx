import { Card } from "@/components/ui/card"
import { format } from "date-fns"
import { Cloud, Sun, CloudRain, CloudSnow, Thermometer, Droplets, Calendar } from "lucide-react"

const getWeatherIcon = (code?: number | null) => {
  if (!code) return <Sun className="h-5 w-5 text-yellow-500" />
  
  // WMO Weather interpretation codes (Open-Meteo uses these)
  if (code === 0) return <Sun className="h-5 w-5 text-yellow-500" />
  if (code >= 1 && code <= 3) return <Cloud className="h-5 w-5 text-gray-500" />
  if (code >= 45 && code <= 49) return <Cloud className="h-5 w-5 text-gray-400" />
  if (code >= 51 && code <= 67) return <CloudRain className="h-5 w-5 text-blue-500" />
  if (code >= 71 && code <= 77) return <CloudSnow className="h-5 w-5 text-blue-300" />
  if (code >= 80 && code <= 82) return <CloudRain className="h-5 w-5 text-blue-600" />
  if (code >= 85 && code <= 86) return <CloudSnow className="h-5 w-5 text-blue-300" />
  
  return <Cloud className="h-5 w-5 text-gray-500" />
}

const getSeverityColor = (severity: number) => {
  if (severity <= 3) return "bg-green-100 text-green-800 border-green-200"
  if (severity <= 6) return "bg-yellow-100 text-yellow-800 border-yellow-200"
  return "bg-red-100 text-red-800 border-red-200"
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
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <Calendar className="h-12 w-12 mx-auto" />
        </div>
        <p className="text-gray-500 text-lg">No symptom logs yet</p>
        <p className="text-gray-400 text-sm mt-1">Start tracking your symptoms to see them here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <Card key={log.id} className="p-5 border-2 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-bold text-lg text-gray-900">{log.symptomType}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(
                    log.severity
                  )}`}
                >
                  {getSeverityLabel(log.severity)} - {log.severity}/10
                </span>
              </div>
              {log.notes && (
                <p className="text-gray-700 text-sm mb-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {log.notes}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">
                    {format(new Date(log.createdAt), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                {log.temperature && (
                  <div className="flex items-center gap-1.5">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    <span>{log.temperature.toFixed(1)}°C</span>
                  </div>
                )}
                {log.humidity && (
                  <div className="flex items-center gap-1.5">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span>{log.humidity.toFixed(0)}%</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
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

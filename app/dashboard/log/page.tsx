"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, FileText, AlertCircle } from "lucide-react"

const symptomTypes = [
  "Migraine",
  "Joint Pain",
  "Fatigue",
  "Headache",
  "Nausea",
  "Dizziness",
  "Chest Pain",
  "Shortness of Breath",
  "Muscle Pain",
  "Other",
]

export default function LogSymptomPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    symptomType: "Migraine",
    severity: 5,
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get user's location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const response = await fetch("/api/symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to log symptom")
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error logging symptom:", error)
      alert("Failed to log symptom. Please make sure location access is enabled.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="mb-6 sm:mb-8 fade-in">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-primary rounded-lg flex items-center justify-center shadow-soft">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1">Log Symptom</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Track your symptoms with automatic weather correlation
            </p>
          </div>
        </div>
      </div>

      <Card className="fade-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="border-b border-border/50 pb-4 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">New Symptom Entry</CardTitle>
          <CardDescription className="flex items-center gap-2 mt-2 text-xs sm:text-sm">
            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
            Your location will be used to fetch current weather data
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Symptom Type
              </label>
              <Select
                value={formData.symptomType}
                onChange={(e) =>
                  setFormData({ ...formData, symptomType: e.target.value })
                }
                required
                className="w-full"
              >
                {symptomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Severity: <span className="text-primary font-semibold">{formData.severity}/10</span>
              </label>
              <Slider
                min={1}
                max={10}
                value={formData.severity}
                onValueChange={(value) =>
                  setFormData({ ...formData, severity: value })
                }
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span className="font-medium">Mild (1-3)</span>
                <span className="font-medium">Moderate (4-6)</span>
                <span className="font-medium">Severe (7-10)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notes (Optional)
              </label>
              <Textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Describe your symptoms, triggers, or any additional context..."
                rows={4}
                className="w-full"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full min-h-[44px]"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging Symptom...
                </>
              ) : (
                "Log Symptom"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

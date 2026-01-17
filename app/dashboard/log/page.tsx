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
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 reveal">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center glow-cyan">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-foreground">Log Symptom</h1>
            <p className="text-muted-foreground mt-1 text-lg">
              Track your symptoms with automatic weather correlation
            </p>
          </div>
        </div>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl reveal reveal-delay-1">
        <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-border/50">
          <CardTitle className="text-2xl text-foreground">New Symptom Entry</CardTitle>
          <CardDescription className="flex items-center gap-2 mt-2 text-muted-foreground">
            <AlertCircle className="h-4 w-4 text-primary" />
            Your location will be used to fetch current weather data
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Symptom Type
              </label>
              <Select
                value={formData.symptomType}
                onChange={(e) =>
                  setFormData({ ...formData, symptomType: e.target.value })
                }
                required
                className="w-full bg-card border-border"
              >
                {symptomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Severity: <span className="text-primary font-bold">{formData.severity}/10</span>
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
                <span className="text-secondary font-medium">Mild (1-3)</span>
                <span className="text-accent font-medium">Moderate (4-6)</span>
                <span className="text-destructive font-medium">Severe (7-10)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Notes (Optional)
              </label>
              <Textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Describe your symptoms, triggers, or any additional context..."
                rows={4}
                className="resize-none bg-card border-border"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 text-lg py-7 glow-cyan transition-all hover-lift"
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

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Copy, Check, Sparkles, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"

export default function ReportsPage() {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateSummary = async () => {
    setLoading(true)
    setSummary(null)

    try {
      const response = await fetch("/api/ai-summary")
      if (!response.ok) {
        throw new Error("Failed to generate summary")
      }

      const data = await response.json()
      setSummary(data.summary)
      setDialogOpen(true)
    } catch (error) {
      console.error("Error generating summary:", error)
      alert("Failed to generate clinical summary. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (summary) {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 reveal">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center glow-emerald">
            <Sparkles className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-foreground">Clinical Reports</h1>
            <p className="text-muted-foreground mt-1 text-lg">
              Generate AI-powered clinical summaries for your doctor
            </p>
          </div>
        </div>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl reveal reveal-delay-1">
        <CardHeader className="bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 border-b border-border/50">
          <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
            <FileText className="h-6 w-6 text-accent" />
            Generate Clinical Summary
          </CardTitle>
          <CardDescription className="text-base mt-2 text-muted-foreground">
            AI will analyze your last 10 symptom logs and create a concise
            medical summary focusing on frequency, severity, and weather
            correlations. Perfect for sharing with your healthcare provider.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Button
            onClick={generateSummary}
            disabled={loading}
            size="lg"
            className="w-full bg-gradient-to-r from-accent to-primary text-primary-foreground hover:from-accent/90 hover:to-primary/90 text-lg py-7 glow-emerald transition-all hover-lift"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Summary...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Clinical Summary
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2 text-foreground">
              <FileText className="h-6 w-6 text-accent" />
              Clinical Summary
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Review and copy this summary to share with your healthcare provider
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {summary && (
              <>
                <div className="bg-muted/30 border-2 border-border/50 p-6 rounded-xl mb-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {summary}
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="w-full text-lg py-6 border-border hover:bg-card hover:border-primary/50 transition-all hover-lift"
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

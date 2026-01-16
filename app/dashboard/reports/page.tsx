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
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Clinical Reports</h1>
            <p className="text-gray-600 mt-1">
              Generate AI-powered clinical summaries for your doctor
            </p>
          </div>
        </div>
      </div>

      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Generate Clinical Summary
          </CardTitle>
          <CardDescription className="text-base mt-2">
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
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
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
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <FileText className="h-6 w-6 text-purple-600" />
              Clinical Summary
            </DialogTitle>
            <DialogDescription className="text-base">
              Review and copy this summary to share with your healthcare provider
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {summary && (
              <>
                <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-lg mb-4 whitespace-pre-wrap text-sm leading-relaxed">
                  {summary}
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="w-full text-lg py-6"
                  size="lg"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-5 w-5 text-green-600" />
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

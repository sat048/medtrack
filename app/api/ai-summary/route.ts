import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { format } from "date-fns"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      )
    }

    // Fetch last 10 logs
    const logs = await prisma.symptomLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    })

    if (logs.length === 0) {
      return NextResponse.json(
        { error: "No symptom logs found" },
        { status: 400 }
      )
    }

    // Format logs for AI
    const logsText = logs
      .map((log) => {
        const date = format(new Date(log.createdAt), "MMM d, yyyy 'at' h:mm a")
        const weather = log.temperature
          ? `Weather: ${log.temperature}°C, ${log.humidity}% humidity`
          : "Weather: N/A"
        return `Date: ${date}\nSymptom: ${log.symptomType}\nSeverity: ${log.severity}/10\n${weather}\nNotes: ${log.notes || "None"}`
      })
      .join("\n\n---\n\n")

    // Generate AI summary
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `You are a medical assistant. Analyze the following symptom logs and create a concise, professional medical summary paragraph suitable for a doctor. Focus on:

1. Frequency and patterns of symptoms
2. Average severity levels
3. Any obvious correlations with weather conditions (temperature, humidity)
4. Notable trends or changes over time
5. Key observations from patient notes

Symptom Logs:
${logsText}

Generate a clear, concise summary (2-3 paragraphs maximum) that a doctor can quickly review.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const summary = response.text()

    return NextResponse.json({ summary })
  } catch (error) {
    console.error("Error generating AI summary:", error)
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    )
  }
}




import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { symptomType, severity, notes, latitude, longitude } = body

    if (!symptomType || !severity || !latitude || !longitude) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Fetch weather data from Open-Meteo API
    let temperature: number | null = null
    let humidity: number | null = null
    let weatherCode: number | null = null

    try {
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`
      )

      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json()
        const current = weatherData.current

        temperature = current.temperature_2m || null
        humidity = current.relative_humidity_2m || null
        weatherCode = current.weather_code || null
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
      // Continue without weather data if API fails
    }

    // Create symptom log
    const symptomLog = await prisma.symptomLog.create({
      data: {
        userId,
        symptomType,
        severity: parseInt(severity),
        notes: notes || null,
        temperature,
        humidity,
        weatherCode,
      },
    })

    return NextResponse.json(symptomLog, { status: 201 })
  } catch (error) {
    console.error("Error creating symptom log:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const logs = await prisma.symptomLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(logs)
  } catch (error) {
    console.error("Error fetching symptom logs:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}




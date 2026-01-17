"use client"

import { useEffect, useState } from "react"

export function ScrollGradient() {
  const [scale, setScale] = useState(1)
  const [opacity, setOpacity] = useState(0.15)

  useEffect(() => {
    const updateGradient = () => {
      const scrollY = window.scrollY
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      )
      const scrollPercent = Math.min(scrollY / maxScroll, 1)

      // Expand gradient based on scroll (scale from 1 to 1.6)
      const newScale = 1 + scrollPercent * 0.6
      const newOpacity = 0.15 + scrollPercent * 0.2

      setScale(newScale)
      setOpacity(newOpacity)
    }

    window.addEventListener('scroll', updateGradient, { passive: true })
    updateGradient() // Initial call

    return () => {
      window.removeEventListener('scroll', updateGradient)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-transparent pointer-events-none transition-all duration-500 ease-out origin-center"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
      }}
    />
  )
}

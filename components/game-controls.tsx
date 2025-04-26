"use client"

import { useEffect } from "react"

interface GameControlsProps {
  onJump: (power?: number, direction?: number) => void
  isMobile: boolean
}

export default function GameControls({ onJump, isMobile }: GameControlsProps) {
  // Keyboard controls for desktop
  useEffect(() => {
    if (isMobile) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return // Prevent holding keys

      if (e.code === "Space") {
        onJump(1, 0)
      } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
        onJump(1, -1)
      } else if (e.code === "KeyD" || e.code === "ArrowRight") {
        onJump(1, 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onJump, isMobile])

  // Touch controls for mobile
  const handleTouchLeft = () => {
    onJump(1, -1)
  }

  const handleTouchRight = () => {
    onJump(1, 1)
  }

  if (!isMobile) return null

  return (
    <>
      {/* Left jump area */}
      <div className="absolute left-0 bottom-0 w-1/2 h-1/3 bg-transparent touch-none" onTouchStart={handleTouchLeft} />

      {/* Right jump area */}
      <div
        className="absolute right-0 bottom-0 w-1/2 h-1/3 bg-transparent touch-none"
        onTouchStart={handleTouchRight}
      />

      {/* Visual indicators for touch areas */}
      <div className="absolute left-4 bottom-4 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
        <span className="text-2xl">←</span>
      </div>
      <div className="absolute right-4 bottom-4 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
        <span className="text-2xl">→</span>
      </div>
    </>
  )
}

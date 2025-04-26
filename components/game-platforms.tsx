"use client"

import { useMemo } from "react"
import type { Platform } from "./frog-jump-game"

interface GamePlatformsProps {
  platforms: Platform[]
  gameWidth: number
  gameHeight: number
}

export default function GamePlatforms({ platforms, gameWidth, gameHeight }: GamePlatformsProps) {
  // Generate some background elements for visual interest
  const backgroundElements = useMemo(() => {
    const elements = []

    // Add some lily pads
    for (let i = 0; i < 10; i++) {
      const size = 20 + Math.random() * 30
      elements.push({
        type: "lilypad",
        x: Math.random() * gameWidth,
        y: Math.random() * gameHeight,
        size,
      })
    }

    // Add some reeds
    for (let i = 0; i < 15; i++) {
      const height = 50 + Math.random() * 100
      elements.push({
        type: "reed",
        x: Math.random() * gameWidth,
        y: gameHeight - height,
        height,
      })
    }

    return elements
  }, [gameWidth, gameHeight])

  return (
    <div className="absolute inset-0">
      {/* Background elements */}
      {backgroundElements.map((element, index) =>
        element.type === "lilypad" ? (
          <div
            key={`bg-${index}`}
            className="absolute rounded-full bg-green-200 opacity-30"
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
          />
        ) : (
          <div
            key={`bg-${index}`}
            className="absolute w-1 bg-green-700 opacity-40"
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              height: `${element.height}px`,
            }}
          />
        ),
      )}

      {/* Platforms */}
      {platforms.map((platform, index) => (
        <div
          key={index}
          className="absolute bg-gradient-to-r from-green-800 to-green-700 rounded-md"
          style={{
            left: `${platform.x}px`,
            top: `${platform.y}px`,
            width: `${platform.width}px`,
            height: `${platform.height}px`,
          }}
        >
          {/* Platform texture */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-full h-1/2 bg-green-600 opacity-50 rounded-t-md"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

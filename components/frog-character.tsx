"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { Position } from "./frog-jump-game"

interface FrogCharacterProps {
  position: Position
  isJumping: boolean
  isFalling: boolean
  rageLevel: number
}

export default function FrogCharacter({ position, isJumping, isFalling, rageLevel }: FrogCharacterProps) {
  const [facingDirection, setFacingDirection] = useState<"left" | "right">("right")
  const [lastX, setLastX] = useState(position.x)

  // Update facing direction based on movement
  useEffect(() => {
    if (position.x !== lastX) {
      if (position.x > lastX) {
        setFacingDirection("right")
      } else {
        setFacingDirection("left")
      }
      setLastX(position.x)
    }
  }, [position.x, lastX])

  return (
    <div
      className={cn(
        "absolute w-16 h-16 transition-transform",
        facingDirection === "left" ? "scale-x-[-1]" : "",
        isJumping ? "animate-bounce" : "",
        isFalling ? "rotate-12" : "",
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `${facingDirection === "left" ? "scaleX(-1)" : ""} ${isFalling ? "rotate(12deg)" : ""}`,
        transition: "transform 0.2s ease",
      }}
    >
      {/* Frog body */}
      <div
        className={cn(
          "w-12 h-10 rounded-full absolute top-4 left-2",
          rageLevel < 50 ? "bg-green-500" : rageLevel < 80 ? "bg-green-600" : "bg-green-700",
        )}
      >
        {/* Frog eyes */}
        <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full">
          <div
            className={cn("absolute top-0.5 left-0.5 w-2 h-2 rounded-full", rageLevel < 50 ? "bg-black" : "bg-red-600")}
          ></div>
        </div>
        <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full">
          <div
            className={cn("absolute top-0.5 left-0.5 w-2 h-2 rounded-full", rageLevel < 50 ? "bg-black" : "bg-red-600")}
          ></div>
        </div>

        {/* Frog mouth */}
        <div
          className={cn(
            "absolute bottom-1 left-3 w-6 h-1 rounded-full",
            rageLevel < 50 ? "bg-green-700" : "bg-red-800",
          )}
        ></div>

        {/* Angry eyebrows when rage level is high */}
        {rageLevel >= 50 && (
          <>
            <div className="absolute top-0 left-0.5 w-3 h-1 bg-red-800 rotate-[-30deg]"></div>
            <div className="absolute top-0 right-0.5 w-3 h-1 bg-red-800 rotate-[30deg]"></div>
          </>
        )}
      </div>

      {/* Frog legs */}
      <div
        className={cn(
          "w-4 h-6 rounded-full absolute bottom-0 left-1 origin-top",
          rageLevel < 50 ? "bg-green-600" : rageLevel < 80 ? "bg-green-700" : "bg-green-800",
          isJumping ? "rotate-[-30deg]" : "",
        )}
      ></div>
      <div
        className={cn(
          "w-4 h-6 rounded-full absolute bottom-0 right-1 origin-top",
          rageLevel < 50 ? "bg-green-600" : rageLevel < 80 ? "bg-green-700" : "bg-green-800",
          isJumping ? "rotate-[30deg]" : "",
        )}
      ></div>
    </div>
  )
}

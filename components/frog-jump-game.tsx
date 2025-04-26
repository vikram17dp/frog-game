"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import FrogCharacter from "./frog-character"
import GamePlatforms from "./game-platforms"
import GameControls from "./game-controls"
import GameOverScreen from "./game-over-screen"
import StartScreen from "./start-screen"

export type GameState = "start" | "playing" | "gameover"
export type Position = { x: number; y: number }
export type Platform = { x: number; y: number; width: number; height: number }

export default function FrogJumpGame() {
  const [gameState, setGameState] = useState<GameState>("start")
  const [frogPosition, setFrogPosition] = useState<Position>({ x: 50, y: 300 })
  const [frogVelocity, setFrogVelocity] = useState<Position>({ x: 0, y: 0 })
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [rageLevel, setRageLevel] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [isFalling, setIsFalling] = useState(false)
  const [gameWidth, setGameWidth] = useState(800)
  const [gameHeight, setGameHeight] = useState(600)
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const jumpSoundRef = useRef<HTMLAudioElement | null>(null)
  const rageSoundRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  // Initialize game
  useEffect(() => {
    // Create initial platforms
    const initialPlatforms: Platform[] = [
      { x: 20, y: 400, width: 100, height: 20 },
      { x: 200, y: 350, width: 100, height: 20 },
      { x: 350, y: 300, width: 100, height: 20 },
      { x: 500, y: 250, width: 100, height: 20 },
      { x: 650, y: 200, width: 100, height: 20 },
    ]
    setPlatforms(initialPlatforms)

    // Load high score from localStorage
    const savedHighScore = localStorage.getItem("frogJumpHighScore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }

    // Create audio elements
    jumpSoundRef.current = new Audio("/jump.mp3")
    rageSoundRef.current = new Audio("/rage.mp3")

    // Set game dimensions based on container
    const updateGameDimensions = () => {
      if (gameContainerRef.current) {
        const width = gameContainerRef.current.clientWidth
        const height = Math.min(window.innerHeight * 0.7, 600)
        setGameWidth(width)
        setGameHeight(height)
      }
    }

    updateGameDimensions()
    window.addEventListener("resize", updateGameDimensions)

    return () => {
      window.removeEventListener("resize", updateGameDimensions)
    }
  }, [])

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return

    const gravity = 0.5
    const friction = 0.9
    const jumpStrength = -12
    const maxVelocity = 15

    let animationFrameId: number
    let lastTimestamp = 0

    const gameLoop = (timestamp: number) => {
      // Calculate delta time to ensure consistent physics regardless of frame rate
      const deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 16 : 1
      lastTimestamp = timestamp

      // Update frog position and velocity
      setFrogPosition((prev) => ({
        x: prev.x + frogVelocity.x * deltaTime,
        y: prev.y + frogVelocity.y * deltaTime,
      }))

      // Apply gravity and friction
      setFrogVelocity((prev) => {
        let newVelY = prev.y + gravity * deltaTime
        const newVelX = prev.x * friction

        // Limit maximum velocity
        if (newVelY > maxVelocity) newVelY = maxVelocity

        return { x: newVelX, y: newVelY }
      })

      // Check if frog is falling
      setIsFalling((prev) => frogVelocity.y > 1)

      // Check for platform collisions
      const frogWidth = 40
      const frogHeight = 40
      let isOnPlatform = false

      platforms.forEach((platform) => {
        // Check if frog is above platform and falling
        if (
          frogPosition.x + frogWidth > platform.x &&
          frogPosition.x < platform.x + platform.width &&
          frogPosition.y + frogHeight >= platform.y &&
          frogPosition.y + frogHeight <= platform.y + platform.height / 2 &&
          frogVelocity.y > 0
        ) {
          setFrogPosition((prev) => ({ ...prev, y: platform.y - frogHeight }))
          setFrogVelocity((prev) => ({ ...prev, y: 0 }))
          setIsJumping(false)
          isOnPlatform = true
        }
      })

      // Check if frog fell off the screen
      if (frogPosition.y > gameHeight) {
        // Play rage sound
        if (rageSoundRef.current) {
          rageSoundRef.current.currentTime = 0
          rageSoundRef.current.play().catch(() => {
            // Handle autoplay restrictions
          })
        }

        // Increase rage level
        setRageLevel((prev) => Math.min(prev + 20, 100))

        // Show rage toast
        if (rageLevel > 50) {
          toast({
            title: "RIBBIT!!! 🤬",
            description: "Your frog is getting ANGRY!",
            variant: "destructive",
          })
        }

        // Reset frog position
        setFrogPosition({ x: 50, y: 300 })
        setFrogVelocity({ x: 0, y: 0 })

        // End game if rage meter is full
        if (rageLevel >= 100) {
          endGame()
          return
        }
      }

      // Check if frog went off the sides
      if (frogPosition.x < -frogWidth) {
        setFrogPosition((prev) => ({ ...prev, x: gameWidth }))
      } else if (frogPosition.x > gameWidth) {
        setFrogPosition((prev) => ({ ...prev, x: -frogWidth }))
      }

      // Update score based on height
      const newScore = Math.max(score, Math.floor((400 - frogPosition.y) / 10))
      if (newScore > score) {
        setScore(newScore)
      }

      animationFrameId = requestAnimationFrame(gameLoop)
    }

    animationFrameId = requestAnimationFrame(gameLoop)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [gameState, frogPosition, frogVelocity, platforms, score, rageLevel, gameHeight, gameWidth, toast])

  // Handle jump
  const handleJump = (power = 1, direction = 0) => {
    if (gameState !== "playing") return

    // Exaggerated physics for rage effect
    const randomFactor = 0.7 + Math.random() * 0.6 // Random factor between 0.7 and 1.3
    const jumpPowerY = -12 * power * randomFactor
    const jumpPowerX = direction * 8 * randomFactor

    // Play jump sound
    if (jumpSoundRef.current) {
      jumpSoundRef.current.currentTime = 0
      jumpSoundRef.current.play().catch(() => {
        // Handle autoplay restrictions
      })
    }

    setFrogVelocity({
      x: jumpPowerX,
      y: jumpPowerY,
    })

    setIsJumping(true)
  }

  // Start game
  const startGame = () => {
    setGameState("playing")
    setFrogPosition({ x: 50, y: 300 })
    setFrogVelocity({ x: 0, y: 0 })
    setScore(0)
    setRageLevel(0)
  }

  // End game
  const endGame = () => {
    setGameState("gameover")

    // Update high score
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("frogJumpHighScore", score.toString())
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Game container */}
      <div
        ref={gameContainerRef}
        className="relative w-full bg-green-100 border-4 border-green-800 rounded-lg overflow-hidden"
        style={{ height: `${gameHeight}px` }}
      >
        {gameState === "start" && <StartScreen onStart={startGame} />}

        {gameState === "playing" && (
          <>
            {/* Game UI */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <Card className="p-2 bg-white/80">
                <p className="text-sm font-bold">Score: {score}</p>
                <p className="text-xs">High Score: {highScore}</p>
              </Card>

              <Card className="p-2 bg-white/80 w-1/3">
                <p className="text-xs font-bold mb-1">Rage Meter</p>
                <Progress
                  value={rageLevel}
                  className="h-2"
                  indicatorClassName={cn(
                    rageLevel < 50 ? "bg-yellow-500" : rageLevel < 80 ? "bg-orange-500" : "bg-red-500",
                  )}
                />
              </Card>
            </div>

            {/* Game elements */}
            <GamePlatforms platforms={platforms} gameWidth={gameWidth} gameHeight={gameHeight} />
            <FrogCharacter position={frogPosition} isJumping={isJumping} isFalling={isFalling} rageLevel={rageLevel} />

            {/* Game controls */}
            <GameControls onJump={handleJump} isMobile={isMobile} />
          </>
        )}

        {gameState === "gameover" && <GameOverScreen score={score} highScore={highScore} onRestart={startGame} />}
      </div>

      {/* Instructions */}
      {gameState === "playing" && (
        <Card className="p-4 mt-4 w-full text-center">
          <h2 className="font-bold mb-2">Controls:</h2>
          {isMobile ? (
            <p>Tap the left or right side of the screen to jump in that direction.</p>
          ) : (
            <p>
              Use <span className="font-bold">Space</span> to jump, <span className="font-bold">A/D</span> or{" "}
              <span className="font-bold">←/→</span> to control direction.
            </p>
          )}
          <p className="text-sm mt-2 text-red-500">Warning: This frog has terrible jump physics!</p>
        </Card>
      )}
    </div>
  )
}

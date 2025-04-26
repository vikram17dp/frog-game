"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from 'react'

interface GameOverScreenProps {
  score: number
  highScore: number
  onRestart: () => void
}

export default function GameOverScreen({ score, highScore, onRestart }: GameOverScreenProps) {
  const isNewHighScore = score >= highScore
  const [showConfetti, setShowConfetti] = useState(isNewHighScore)

  useEffect(() => {
    if (isNewHighScore) {
      // Hide confetti after 3 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [isNewHighScore])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-100/80 backdrop-blur-sm z-20">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}px`,
                width: `${5 + Math.random() * 10}px`,
                height: `${5 + Math.random() * 10}px`,
                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                animationDuration: `${1 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <Card className="w-4/5 max-w-md p-6 bg-white/90">
        <h2 className="text-3xl font-bold text-center mb-4 text-red-800">GAME OVER</h2>

        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            {/* Angry frog illustration */}
            <div className="w-20 h-16 rounded-full bg-green-700 absolute top-4 left-2 animate-pulse">
              <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full">
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-600"></div>
              </div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full">
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-600"></div>
              </div>
              <div className="absolute top-1 left-3 w-4 h-1 bg-red-800 rotate-[-30deg]"></div>
              <div className="absolute top-1 right-3 w-4 h-1 bg-red-800 rotate-[30deg]"></div>
              <div className="absolute bottom-2 left-6 w-8 h-2 rounded-full bg-red-800"></div>
            </div>
            <div className="w-6 h-8 rounded-full bg-green-800 absolute bottom-0 left-2"></div>
            <div className="w-6 h-8 rounded-full bg-green-800 absolute bottom-0 right-2"></div>
            
            {/* Steam coming out of angry frog's head */}
            <div className="absolute -top-2 left-8 w-2 h-2 bg-white rounded-full animate-float opacity-80"></div>
            <div className="absolute -top-4 left-10 w-3 h-3 bg-white rounded-full animate-float opacity-60" 
                 style={{ animationDelay: "0.3s" }}></div>
            <div className="absolute -top-6 left-12 w-4 h-4 bg-white rounded-full animate-float opacity-40"
                 style={{ animationDelay: "0.6s" }}></div>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-xl mb-2">
            Your Score: <span className="font-bold">{score}</span>
          </p>
          <p className="text-lg">
            High Score: <span className="font-bold">{highScore}</span>
          </p>

          {isNewHighScore && (
            <p className="text-lg text-green-600 font-bold mt-2 animate-bounce">New High Score!</p>
          )}
        </div>

        <p className="text-center mb-6 italic">
          {score < 10
            ? "Did you even try?"
            : score < 30
              ? "Not bad, but you can do better!"
              : score < 50
                ? "Good effort!"
                : score < 100
                  ? "Impressive! You've mastered the rage!"
                  : "WOW! You're a frog jumping legend!"}
        </p>

        <div className="flex justify-center">
          <Button 
            onClick={onRestart} 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 transition-transform hover:scale-105"
          >
            Try Again
          </Button>
        </div>
      </Card>
    </div>
  )
}

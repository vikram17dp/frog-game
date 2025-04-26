"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface GameOverScreenProps {
  score: number
  highScore: number
  onRestart: () => void
}

export default function GameOverScreen({ score, highScore, onRestart }: GameOverScreenProps) {
  const isNewHighScore = score >= highScore

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-100/80 backdrop-blur-sm z-20">
      <Card className="w-4/5 max-w-md p-6 bg-white/90">
        <h2 className="text-3xl font-bold text-center mb-4 text-red-800">GAME OVER</h2>

        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            {/* Angry frog illustration */}
            <div className="w-20 h-16 rounded-full bg-green-700 absolute top-4 left-2">
              <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full">
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-600"></div>
              </div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full">
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-600"></div>
              </div>
              <div className="absolute top-1 left-3 w-4 h-1 bg-red-800 rotate-[-30deg]"></div>
              <div className="absolute top-1 right-3 w-4 h-1 bg-red-800 rotate-[30deg]"></div>
              <div className="absolute bottom-2 left-6 w-8 h-1 rounded-full bg-red-800"></div>
            </div>
            <div className="w-6 h-8 rounded-full bg-green-800 absolute bottom-0 left-2"></div>
            <div className="w-6 h-8 rounded-full bg-green-800 absolute bottom-0 right-2"></div>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-xl mb-2">
            Your Score: <span className="font-bold">{score}</span>
          </p>
          <p className="text-lg">
            High Score: <span className="font-bold">{highScore}</span>
          </p>

          {isNewHighScore && <p className="text-lg text-green-600 font-bold mt-2">New High Score!</p>}
        </div>

        <p className="text-center mb-6 italic">
          {score < 10
            ? "Did you even try?"
            : score < 30
              ? "Not bad, but you can do better!"
              : score < 50
                ? "Good effort!"
                : "Impressive! You've mastered the rage!"}
        </p>

        <div className="flex justify-center">
          <Button onClick={onRestart} className="bg-green-600 hover:bg-green-700 text-white px-8 py-2">
            Try Again
          </Button>
        </div>
      </Card>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-100/80 backdrop-blur-sm z-20">
      <Card className="w-4/5 max-w-md p-6 bg-white/90">
        <h2 className="text-3xl font-bold text-center mb-4 text-green-800">Frog Jump Rage Game</h2>

        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            {/* Simple frog illustration */}
            <div className="w-20 h-16 rounded-full bg-green-500 absolute top-4 left-2">
              <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full">
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-black"></div>
              </div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full">
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-black"></div>
              </div>
              <div className="absolute bottom-2 left-6 w-8 h-1 rounded-full bg-green-700"></div>
            </div>
            <div className="w-6 h-8 rounded-full bg-green-600 absolute bottom-0 left-2"></div>
            <div className="w-6 h-8 rounded-full bg-green-600 absolute bottom-0 right-2"></div>
          </div>
        </div>

        <p className="text-center mb-4">
          Control a frog with terrible jump physics! Try to climb as high as you can without falling.
        </p>

        <p className="text-center mb-6 text-red-500 font-bold">Warning: This game may cause extreme frustration!</p>

        <div className="flex justify-center">
          <Button onClick={onStart} className="bg-green-600 hover:bg-green-700 text-white px-8 py-2">
            Start Game
          </Button>
        </div>
      </Card>
    </div>
  )
}

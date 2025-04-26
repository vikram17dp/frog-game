import FrogJumpGame from "@/components/frog-jump-game"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-green-300 to-green-500">
      <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md mb-6 text-center">Frog Jump Rage Game</h1>
      <div className="w-full max-w-4xl">
        <FrogJumpGame />
      </div>
    </main>
  )
}

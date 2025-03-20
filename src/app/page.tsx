"use client";

import { Suspense, use } from "react";
import QuizGame from "@/components/quiz-game";
import { GameProvider } from "@/context/game-context";
import LoadingQuiz from "@/components/loading-quiz";
import { useState } from "react";
import StartGame from "@/components/StartGame";

export const dynamic = "force-dynamic";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 dark:text-blue-400 mb-2">
          Globetrotter
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-8">
          Test your knowledge of famous destinations around the world!
        </p>

        {isPlaying ? (
          <GameProvider>
            <Suspense fallback={<LoadingQuiz />}>
              <QuizGame changePlayingState={setIsPlaying} />
            </Suspense>
          </GameProvider>
        ) : (
          <StartGame changePlayingState={setIsPlaying} />
        )}
      </div>
    </main>
  );
}

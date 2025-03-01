"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GameProvider } from "@/context/game-context";
import QuizGame from "@/components/quiz-game";
import { ArrowLeft, Trophy } from "lucide-react";

export default function ChallengePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [challengeInfo, setChallengeInfo] = useState({
    from: "",
    score: 0,
    correct: 0,
    wrong: 0,
  });

  useEffect(() => {
    if (searchParams) {
      setChallengeInfo({
        from: searchParams.get("from") || "",
        score: Number.parseInt(searchParams.get("score") || "0", 10),
        correct: Number.parseInt(searchParams.get("correct") || "0", 10),
        wrong: Number.parseInt(searchParams.get("wrong") || "0", 10),
      });
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <Button className="mb-4" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Challenge Accepted!
            </h1>

            {challengeInfo.from && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg inline-block">
                <p className="text-slate-700 dark:text-slate-300 mb-2">
                  <span className="font-bold">{challengeInfo.from}</span> has
                  challenged you!
                </p>
                <div className="flex items-center justify-center gap-3 text-sm">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>Score: {challengeInfo.score}</span>
                  </div>
                  <span>•</span>
                  <span>{challengeInfo.correct} correct</span>
                  <span>•</span>
                  <span>{challengeInfo.wrong} wrong</span>
                </div>
              </div>
            )}
          </div>

          <GameProvider>
            <QuizGame />
          </GameProvider>
        </div>
      </div>
    </main>
  );
}

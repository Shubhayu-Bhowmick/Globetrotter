"use client";

import { useGameContext } from "@/context/game-context";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Trophy } from "lucide-react";
import { useEffect } from "react";

export default function ScoreBoard() {
  const { score, correctAnswers, wrongAnswers, username } = useGameContext();
  console.log("Scoreboard render:", { score, correctAnswers, wrongAnswers });
  useEffect(() => {
    console.log("Score updated:", score);
  }, [score, correctAnswers, wrongAnswers]);

  return (
    <Card className="p-4 bg-white dark:bg-slate-800 shadow-sm w-full sm:w-auto">
      <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-bold text-xl">{score}</span>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>{correctAnswers}</span>
        </div>

        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-500" />
          <span>{wrongAnswers}</span>
        </div>

        {username && (
          <div className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded text-sm text-blue-700 dark:text-blue-300">
            {username}
          </div>
        )}
      </div>
    </Card>
  );
}

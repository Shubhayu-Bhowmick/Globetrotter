"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import confetti from "canvas-confetti";
import { Frown, PartyPopper, ArrowRight, RotateCcw } from "lucide-react";

interface FeedbackModalProps {
  isCorrect: boolean;
  fact: string;
  onNext: () => void;
  onPlayAgain: () => void;
}

export default function FeedbackModal({
  isCorrect,
  fact,
  onNext,
  onPlayAgain,
}: FeedbackModalProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Set animation as complete after a delay
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isCorrect]);

  return (
    <Card
      className={`p-6 border-2 ${
        isCorrect
          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
          : "border-red-500 bg-red-50 dark:bg-red-900/20"
      } rounded-xl transition-all duration-300 transform ${
        animationComplete ? "scale-100" : "scale-95"
      }`}
    >
      <div className="flex flex-col items-center text-center mb-4">
        {isCorrect ? (
          <>
            <PartyPopper className="h-12 w-12 text-green-500 mb-2 animate-bounce" />
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
              Correct Answer!
            </h3>
          </>
        ) : (
          <>
            <Frown className="h-12 w-12 text-red-500 mb-2 animate-pulse" />
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Oops! Thats not right.
            </h3>
          </>
        )}

        <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300">
            <span className="font-semibold">Fun Fact:</span> {fact}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button onClick={onPlayAgain} className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Play Again
        </Button>
        <Button
          onClick={onNext}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          Next Question
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

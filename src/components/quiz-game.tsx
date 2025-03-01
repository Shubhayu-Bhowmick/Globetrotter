"use client";

import { useState, useEffect } from "react";
import { useGameContext } from "@/context/game-context";
import DestinationOptions from "@/components/destination-options";
import ScoreBoard from "@/components/score-board";
import LoginButton from "@/components/login-button";
import ChallengeButton from "@/components/challenge-button";
import FeedbackModal from "@/components/feedback-modal";
import type { Destination } from "@/lib/types";

export default function QuizGame() {
  const { isLoggedIn, updateScore } = useGameContext();

  const [currentDestination, setCurrentDestination] =
    useState<Destination | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackInfo, setFeedbackInfo] = useState("");

  useEffect(() => {
    fetchRandomDestination();
  }, []);

  const fetchRandomDestination = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/destinations/random");
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const data = await response.json();

      console.log("Random destination:", data);

      setCurrentDestination(data.destination);
      setOptions(data.options);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch destination:", error);
      setLoading(false);
    }
  };

  const handleAnswer = (selectedCity: string) => {
    if (!currentDestination) return;

    const correct = selectedCity === currentDestination.city;
    setIsCorrect(correct);

    // Get a random fun fact or trivia
    const facts = currentDestination.fun_fact || [];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    setFeedbackInfo(randomFact || "");
    setShowFeedback(true);

    // Update score in context
    updateScore(correct);
  };

  const handleNext = () => {
    setShowFeedback(false);
    fetchRandomDestination();
  };

  const handlePlayAgain = () => {
    setShowFeedback(false);
    // Keep the same destination but shuffle options
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
  };

  if (loading) {
    return (
      <div className="text-center py-10">Loading your next destination...</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <ScoreBoard />
        <div className="flex gap-2">
          <LoginButton />
          {isLoggedIn && <ChallengeButton />}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Guess this destination:
        </h2>
        <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-lg mb-6">
          {currentDestination?.clues.slice(0, 2).map((clue, index) => (
            <p key={index} className="text-slate-700 dark:text-slate-300 mb-2">
              🌍 {clue}
            </p>
          ))}
        </div>

        <DestinationOptions
          options={options}
          onSelect={handleAnswer}
          disabled={showFeedback}
        />
      </div>

      {showFeedback && (
        <FeedbackModal
          isCorrect={isCorrect}
          fact={feedbackInfo}
          onNext={handleNext}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

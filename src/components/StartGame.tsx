"use client";

import React from "react";
import { useGameContext } from "@/context/game-context";

const StartGame = ({ changePlayingState }) => {
  const { setQuestionCount, questionCount } = useGameContext();
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => {
          changePlayingState(true);
          setQuestionCount(0);
        }}
        className="p-4 rounded-md bg-green-600"
      >
        Start Game
      </button>
      <button
        onClick={() => {
          changePlayingState(true);
          setQuestionCount(questionCount);
        }}
        className="p-4 rounded-md bg-amber-400"
      >
        Continue Game
      </button>
    </div>
  );
};

export default StartGame;

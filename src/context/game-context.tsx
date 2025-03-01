"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface GameContextType {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  isLoggedIn: boolean;
  username: string | null;
  updateScore: (correct: boolean) => void;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

// Create the context with default values
export const GameContext = createContext<GameContextType>({
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  isLoggedIn: false,
  username: null,
  updateScore: () => {},
  login: async () => {},
  logout: () => {},
});

// Custom hook to use the game context
export const useGameContext = () => useContext(GameContext);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Load game state from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("globetrotterGameState");
      if (savedState) {
        try {
          const { score, correctAnswers, wrongAnswers, isLoggedIn, username } =
            JSON.parse(savedState);
          setScore(score || 0);
          setCorrectAnswers(correctAnswers || 0);
          setWrongAnswers(wrongAnswers || 0);
          setIsLoggedIn(isLoggedIn || false);
          setUsername(username || null);
        } catch (error) {
          console.error("Error parsing saved game state:", error);
        }
      }
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "globetrotterGameState",
        JSON.stringify({
          score,
          correctAnswers,
          wrongAnswers,
          isLoggedIn,
          username,
        })
      );
    }
  }, [score, correctAnswers, wrongAnswers, isLoggedIn, username]);

  // Update user score in both local state and backend
  const updateScore = (correct: boolean) => {
    if (correct) {
      setScore((prev) => prev + 1);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setScore((prev) => Math.max(0, prev - 1)); // Prevent negative scores
      setWrongAnswers((prev) => prev + 1);
    }

    // If user is logged in, update their score in the database
    if (isLoggedIn && username) {
      updateUserScore(username, correct);
    }
  };

  // Send updated user score to the backend
  const updateUserScore = async (username: string, correct: boolean) => {
    try {
      await fetch("/api/users/update-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          correct,
        }),
      });
    } catch (error) {
      console.error("Failed to update user score:", error);
    }
  };

  // Handle user login and fetch their stored game data
  const login = async (name: string) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Login failed:", data.error);
        return;
      }

      // Ensure we extract user details correctly
      const user = data.user;

      if (!user) {
        console.error("Invalid response structure:", data);
        return;
      }

      setIsLoggedIn(true);
      setUsername(user.username);
      setScore(user.score || 0);
      setCorrectAnswers(user.correct_count || 0);
      setWrongAnswers(user.wrong_count || 0);

      console.log("Updated Score:", user.score); // Debugging
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Handle user logout
  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setScore(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);

    // Clear localStorage on logout
    localStorage.removeItem("globetrotterGameState");
  };

  return (
    <GameContext.Provider
      value={{
        score,
        correctAnswers,
        wrongAnswers,
        isLoggedIn,
        username,
        updateScore,
        login,
        logout,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

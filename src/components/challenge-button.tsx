"use client";

import { useState, useRef, useEffect } from "react";
import { useGameContext } from "@/context/game-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share2, Copy, Check } from "lucide-react";
//import Image from "next/image";

export default function ChallengeButton() {
  const { username, score, correctAnswers, wrongAnswers } = useGameContext();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Always create canvas element, even when dialog is closed
  useEffect(() => {
    // Only try to generate the image after the dialog is fully opened
    if (open) {
      // Wait for next render cycle to ensure canvas is in DOM
      const timer = setTimeout(() => {
        generateDynamicImage();
      }, 200); // Add a small delay to ensure DOM is ready

      return () => clearTimeout(timer);
    } else {
      // Reset image when dialog closes
      setImageUrl(null);
    }
  }, [open]);

  // Generate challenge link with query params
  const generateChallengeLink = () => {
    const baseUrl = window.location.origin;
    const challengeUrl = new URL(`${baseUrl}/challenge`);

    challengeUrl.searchParams.append("from", username || "Anonymous");
    challengeUrl.searchParams.append("score", score.toString());
    challengeUrl.searchParams.append("correct", correctAnswers.toString());
    challengeUrl.searchParams.append("wrong", wrongAnswers.toString());

    // If we have an image URL, add it to the challenge link
    if (imageUrl && !imageUrl.startsWith("data:")) {
      challengeUrl.searchParams.append("image", imageUrl);
    }

    return challengeUrl.toString();
  };

  const challengeLink = generateChallengeLink();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(challengeLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    // Generate final share link with the most up-to-date challenge link
    const finalChallengeLink = generateChallengeLink();
    const message = encodeURIComponent(
      `Hey! I've scored ${score} points in Globetrotter. Can you beat me? Play here: ${finalChallengeLink}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
    setOpen(false);
  };

  // Generate dynamic image
  const generateDynamicImage = async () => {
    setIsGeneratingImage(true);

    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error("Canvas element not found in DOM");
        setIsGeneratingImage(false);
        return; // Return instead of throwing to prevent error in console
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Could not get canvas context");
        setIsGeneratingImage(false);
        return;
      }

      // Set Canvas Size
      canvas.width = 500;
      canvas.height = 250;

      // Background
      ctx.fillStyle = "#282c34";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Title Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Challenge Accepted! 🎯", canvas.width / 2, 50);

      // Username
      ctx.font = "bold 20px Arial";
      ctx.fillText(`Player: ${username || "Anonymous"}`, canvas.width / 2, 100);

      // Score
      ctx.font = "bold 20px Arial";
      ctx.fillText(`Score: ${score}`, canvas.width / 2, 140);

      // Stats
      ctx.font = "16px Arial";
      ctx.fillText(
        `${correctAnswers} correct • ${wrongAnswers} wrong`,
        canvas.width / 2,
        180
      );

      // Get canvas data URL
      const dataUrl = canvas.toDataURL("image/png");
      setImageUrl(dataUrl);
      console.log("Image generated successfully");
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <>
      {/* Always render the canvas, but keep it hidden */}
      <canvas ref={canvasRef} className="hidden" width="500" height="250" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Challenge
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gray-200 dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle>Challenge a Friend</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                Your current score: <span className="font-bold">{score}</span>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {correctAnswers} correct • {wrongAnswers} wrong
              </p>
            </div>

            {/* Display generated image or loading state */}
            {imageUrl ? (
              <div className="relative rounded-lg overflow-hidden shadow-md">
                {/* Use a regular img tag instead of Next.js Image to avoid issues with data URLs */}
                <img src={imageUrl} alt="Challenge Image" className="w-full" />
              </div>
            ) : (
              <div className="w-full h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  {isGeneratingImage
                    ? "Generating image..."
                    : "Ready to share your challenge!"}
                </p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <div className="relative">
                  <input
                    className="w-full p-2 pr-10 border rounded-md text-sm bg-slate-50 dark:bg-slate-800"
                    value={challengeLink}
                    readOnly
                  />
                  <Button
                    className="absolute right-1 top-1 h-6 w-6"
                    onClick={handleCopyLink}
                    variant="ghost"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleShareWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Share on WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

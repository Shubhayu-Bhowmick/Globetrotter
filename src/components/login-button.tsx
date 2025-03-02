import { useState } from "react";
import { useGameContext } from "@/context/game-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Loader2 } from "lucide-react";

export default function LoginButton() {
  const { isLoggedIn, login, username } = useGameContext();
  const [usernameInput, setUsernameInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogin = async () => {
    if (!usernameInput.trim()) {
      setError("Username cannot be empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to login");
        return;
      }

      // ✅ Pass just the username since login now correctly fetches and updates other data
      await login(usernameInput);

      setTimeout(() => setOpen(false), 100);
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        if (state) setError(""); // Reset error when opening
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="relative flex items-center gap-2 px-6 py-3 rounded-md font-medium text-md transition-all duration-200 bg-gradient-to-r from-blue-200 to-indigo-200 hover:scale-105 hover:shadow-xl"
        >
          <LogIn className="h-5 w-5" />
          {isLoggedIn ? username : "Login"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white/80 backdrop-blur-lg shadow-xl rounded-md p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-gray-800">
            Login or Register
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700">
              Choose a unique username
            </Label>
            <Input
              id="username"
              placeholder="Enter username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <Button
            onClick={handleLogin}
            className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all rounded-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Please wait
              </>
            ) : (
              "Continue"
            )}
          </Button>

          
        </div>
      </DialogContent>
    </Dialog>
  );
}

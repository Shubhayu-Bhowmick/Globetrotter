"use client";

import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface DestinationOptionsProps {
  options: string[];
  onSelect: (city: string) => void;
  disabled?: boolean;
}

export default function DestinationOptions({
  options,
  onSelect,
  disabled = false,
}: DestinationOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((city) => (
        <Button
          key={city}
          className="h-auto py-4 text-lg justify-start gap-2 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all"
          onClick={() => onSelect(city)}
          disabled={disabled}
        >
          <Globe className="h-5 w-5 text-blue-500" />
          <span>{city}</span>
        </Button>
      ))}
    </div>
  );
}

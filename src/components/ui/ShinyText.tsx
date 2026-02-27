"use client";

import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number; // seconds
  disabled?: boolean;
}

export function ShinyText({
  text,
  className,
  speed = 3,
  disabled = false,
}: ShinyTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        disabled ? "" : "animate-shiny-text",
        className
      )}
      style={
        disabled
          ? undefined
          : ({
              backgroundImage:
                "linear-gradient(120deg, #6B6B78 40%, #E8E6E0 50%, #C8FF00 55%, #E8E6E0 60%, #6B6B78 70%)",
              backgroundSize: "250% 100%",
              backgroundPosition: "100% center",
              animationDuration: `${speed}s`,
            } as React.CSSProperties)
      }
    >
      {text}
    </span>
  );
}

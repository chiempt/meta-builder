import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

function Badge({ className, color = "blue", ...props }: BadgeProps) {
  // A mapping of base colors to Tailwind classes
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    gray: "bg-gray-50 text-gray-700 border-gray-200",
  };

  const colorClass = colorMap[color] || colorMap.gray;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        colorClass,
        className
      )}
      {...props}
    />
  );
}

export { Badge };

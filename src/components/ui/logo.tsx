import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  return (
    <Link href="/" aria-label="CivicServe home" className="inline-flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 160 40"
        fill="none"
        className={cn("h-8 w-auto sm:h-9", className)}
        role="img"
        aria-labelledby="civicserve-logo-title"
      >
        <title id="civicserve-logo-title">CivicServe</title>
        <rect x="2" y="6" width="28" height="28" rx="8" fill="#2563EB" />
        <path d="M16 11L9 16.5V28H23V16.5L16 11Z" fill="white" />
        <circle cx="16" cy="19.5" r="2.5" fill="#2563EB" />
        <path
          d="M16 22V25"
          stroke="#2563EB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <text
          x="38"
          y="26"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="18"
          // fill="#0F172A"
          fill={variant === "light" ? "#FFFFFF" : "#0F172A"}
          letterSpacing="-0.02em"
        >
          Civic<tspan fill="#2563EB">Serve</tspan>
        </text>
      </svg>
    </Link>
  );
}

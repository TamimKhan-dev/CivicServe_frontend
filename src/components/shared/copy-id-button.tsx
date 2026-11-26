"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyIdButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.log("Something went wrong while copying!");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy ID"
      className="rounded p-1 text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-600" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
    </button>
  );
}

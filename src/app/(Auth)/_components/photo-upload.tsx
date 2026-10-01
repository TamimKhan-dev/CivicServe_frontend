"use client";

import { FileImage, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

type PhotoUploadProps = {
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};

export function PhotoUpload({
  value,
  onChange,
  error,
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(
    () => (value ? URL.createObjectURL(value) : null),
    [value],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div>
      <div className="flex items-center gap-4 rounded-xl bg-slate-100 p-4">
        <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-400">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Selected profile photo"
              className="size-full object-cover"
              width={150}
              height={150}
            />
          ) : (
            <User className="size-5" aria-hidden />
          )}
        </span>

        <div className="min-w-0">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <FileImage className="size-4" aria-hidden />
            {value ? "Change photo" : "Upload photo"}
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="ml-3 text-xs text-slate-500 underline hover:text-slate-700"
            >
              Remove
            </button>
          ) : null}
          <p className="mt-0.5 text-sm text-slate-600">
            JPG, PNG or WebP, max 3MB
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          aria-label="Upload profile photo"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </div>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

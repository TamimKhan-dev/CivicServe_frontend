"use client";

import { ImagePlus, RefreshCw, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { IMAGE_TYPES } from "@/validations/request.validation";

type ImageUploadFieldProps = {
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export function RequestImageUploadField({
  value,
  onChange,
  error,
}: ImageUploadFieldProps) {
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

  const openPicker = () => inputRef.current?.click();

  const remove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {value ? (
        <div className="flex flex-col gap-3 rounded-xl bg-indigo-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Selected image preview"
                className="size-12 shrink-0 rounded-lg border bg-white object-cover"
                width={150}
                height={150}
              />
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {value.name}
              </p>
              <p className="text-xs text-slate-500">
                {formatSize(value.size)} • Ready to upload
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              type="button"
              onClick={openPicker}
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700"
            >
              <RefreshCw className="size-3.5" aria-hidden />
              Replace
            </button>
            <button
              type="button"
              onClick={remove}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800"
            >
              <X className="size-3.5" aria-hidden />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openPicker}
          className="flex w-full flex-col items-center gap-1.5 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center transition-colors hover:border-blue-300 hover:bg-blue-50/40"
        >
          <ImagePlus className="size-6 text-slate-400" aria-hidden />
          <span className="text-sm font-semibold text-slate-700">
            Click to choose an image
          </span>
          <span className="text-xs text-slate-500">
            JPG, PNG or WebP, max 3 MB
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_TYPES.join(",")}
        className="sr-only"
        aria-label="Upload an image"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
          e.target.value = ""; // lets the user pick the same file again
        }}
      />

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

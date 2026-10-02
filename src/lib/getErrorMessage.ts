import type { FetchError } from "ofetch";

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  const err = error as FetchError;
  return err?.data?.message ?? err?.message ?? fallback;
}

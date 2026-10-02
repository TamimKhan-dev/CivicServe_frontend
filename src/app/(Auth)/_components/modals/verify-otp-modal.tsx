"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  ArrowRight,
  Check,
  Clock,
  Loader2,
  Lock,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { formatTime, maskEmail } from "@/lib/utils";

const OTP_LENGTH = 6;

type TwoFactorModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onVerify: (code: string) => Promise<void> | void;
  isPending?: boolean;
  onBack?: () => void;
  onExpire?: () => void;
  expiresInSeconds?: number;
};

export function VerifyOtpModal({
  open,
  onOpenChange,
  email,
  onVerify,
  isPending = false,
  onExpire,
  expiresInSeconds = 300,
}: TwoFactorModalProps) {
  const [code, setCode] = useState("");
  const [remaining, setRemaining] = useState(expiresInSeconds);

  const onOpenChangeRef = useRef(onOpenChange);
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!open) return;

    setCode("");
    setRemaining(expiresInSeconds);
    const endsAt = Date.now() + expiresInSeconds * 1000;

    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) {
        clearInterval(id);
        onExpireRef.current?.();
        onOpenChangeRef.current(false);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [open, expiresInSeconds]);

  const progress = (remaining / expiresInSeconds) * 100;
  const canSubmit = code.length === OTP_LENGTH && !isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden p-0 sm:max-w-md"
      >
        {/* Header */}
        <div className="border-b px-5 py-4 pr-12">
          <DialogTitle className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Two-Factor Authentication (2FA) • Secure Gov-Gateway
          </DialogTitle>
        </div>

        <div className="px-5 py-6 sm:px-8">
          {/* Icon */}
          <div className="mx-auto flex w-fit">
            <div className="relative flex size-14 items-center justify-center rounded-xl border bg-white shadow-sm">
              <ShieldCheck className="size-7 text-blue-600" aria-hidden />
              <span className="absolute -bottom-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                <Check className="size-3" aria-hidden />
              </span>
            </div>
          </div>

          <p className="mt-4 text-center text-sm font-semibold text-slate-900">
            Verify Your Identity
          </p>
          <DialogDescription className="mt-2 text-center text-sm text-slate-600">
            We&apos;ve sent a {OTP_LENGTH}-digit verification code to your email{" "}
            <span className="font-semibold text-slate-900">
              {maskEmail(email)}
            </span>
            .
          </DialogDescription>

          {/* OTP input */}
          <div className="mt-6 flex justify-center">
            <InputOTP
              maxLength={OTP_LENGTH}
              pattern={REGEXP_ONLY_DIGITS}
              value={code}
              onChange={setCode}
              disabled={isPending}
              autoFocus
              aria-label="Verification code"
            >
              <InputOTPGroup className="gap-1.5 sm:gap-2">
                {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="size-10 rounded-lg border text-base font-semibold text-blue-700 first:rounded-lg first:border-l last:rounded-lg sm:size-12"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Timer */}
          <div className="mt-6 rounded-xl border bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <Clock className="size-4 text-blue-600" aria-hidden />
                Code expires in:
              </span>
              <span
                className="rounded-md bg-blue-100 px-2 py-0.5 font-mono text-sm font-semibold text-blue-700"
                role="timer"
                aria-live="off"
              >
                {formatTime(remaining)}
              </span>
            </div>

            <div
              className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-label="Time remaining"
            >
              <div
                className="h-full rounded-full bg-blue-600 transition-[width] duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* UI only: not interactive */}
            <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-slate-500">
              <span>Didn&apos;t receive code?</span>
              <span className="flex items-center gap-1">
                <Phone className="size-3" aria-hidden />
                Call me
              </span>
            </div>
          </div>

          {/* Actions */}
          <Button
            type="button"
            disabled={!canSubmit}
            onClick={() => onVerify(code)}
            className="mt-5 h-11 w-full bg-blue-600 font-semibold hover:bg-blue-700"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <>
                Verify &amp; Continue
                <ArrowRight className="size-4" aria-hidden />
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="mt-4 block w-full text-center text-sm text-slate-600 transition-colors hover:text-slate-900"
          >
            Back to Login credentials
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 border-t bg-slate-50 px-5 py-3 text-center text-[11px] text-slate-500">
          <Lock className="size-3.5 shrink-0 text-emerald-600" aria-hidden />
          256-bit Municipal AES Encryption • Official City Dispatch Network
        </div>
      </DialogContent>
    </Dialog>
  );
}

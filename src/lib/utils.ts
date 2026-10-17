import { format, formatDistanceToNow } from "date-fns";

export { cn } from "cn";

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function formatTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  return `${name[0]}••••@${domain}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

export const formatDateTime = (date: string | Date) => {
  return format(new Date(date), "MMMM d, yyyy 'at' h:mm a");
};

export function timeAgo(date: string | Date) {
  const parsedDate = new Date(date);

  const diffInSeconds = Math.abs((parsedDate.getTime() - Date.now()) / 1000);
  if (diffInSeconds < 60) {
    return "just now";
  }

  return formatDistanceToNow(parsedDate, { addSuffix: true });
}

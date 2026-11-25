import { formatDistanceToNow } from "date-fns";

export { cn } from "cn";

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  return `${name[0]}••••@${domain}`;
}

export function timeAgo(date: string | Date) {
  const parsedDate = new Date(date);

  const diffInSeconds = Math.abs((parsedDate.getTime() - Date.now()) / 1000);
  if (diffInSeconds < 60) {
    return "just now";
  }

  return formatDistanceToNow(parsedDate, { addSuffix: true });
}

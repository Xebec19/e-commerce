import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ellipsis(message: string, len: number) {
  if (message.length > len) {
    return message.slice(0, len) + "...";
  }

  return message;
}

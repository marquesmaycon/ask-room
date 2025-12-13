import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractInitials(text?: string): string {
  const words = text?.trim().split(/\s+/).slice(0, 2) || []
  return words
    .map((word) => word.slice(0, 2))
    .join("")
    .toUpperCase()
}
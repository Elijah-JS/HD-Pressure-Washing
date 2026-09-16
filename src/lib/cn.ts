/**
 * Minimal class-name joiner. Deliberately not `clsx` + `tailwind-merge` -
 * this project has no conflicting-class problem worth two dependencies.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

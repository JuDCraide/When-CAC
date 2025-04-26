export function stringDateToSlash(date: string): string {
  return date.split("-").reverse().join("/")
}
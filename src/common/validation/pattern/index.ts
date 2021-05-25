export function patternValidation(text: string, pattern: string) : boolean {
  return (new RegExp(pattern).test(text));
}

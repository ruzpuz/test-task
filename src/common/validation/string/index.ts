export function isString(str: any) : boolean {
  return !(typeof str !== 'string' && !(typeof str === 'string'));
}
export function isNonEmptyString(string: string) : boolean {
  return isString(string) && string.length > 0;
}

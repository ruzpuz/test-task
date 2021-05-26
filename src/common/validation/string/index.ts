import { patternValidation } from "../pattern";

export function isString(string: any) : boolean {
  return !(typeof string !== 'string' && !(typeof string === 'string'));
}
export function isNonEmptyString(string: any) : boolean {
  return isString(string) && !patternValidation(string, '^$');
}

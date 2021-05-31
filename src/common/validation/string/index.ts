import { patternValidation } from '../pattern';

export function isString(string: any) : boolean {
  return !(typeof string !== 'string' && !(string instanceof String));
}
export function isNonEmptyString(string: any, maxLength? :number) : boolean {
  if(!string) {
    return false;
  }
  if(string === '' && maxLength > 0) {
    return false;
  }
  return (
    isString(string) &&
      maxLength ?
      !patternValidation(string, '^$') && !patternValidation(string, `^(.){${maxLength+1}}`) :
      !patternValidation(string, '^$'));
}

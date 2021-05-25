export function isString(string){
  return !(typeof string !== 'string' && !(string instanceof String));
}
export function isNonEmptyString(string) {
  return isString(string) && string.length > 0;
}

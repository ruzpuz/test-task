function parseStrictInt(variable: any) :number {
  if(/^([+-])?([0-9]+|Infinity)$/.test(variable)) {
    return Number(variable);
  }
  return NaN;
}
function parseStrictFloat(variable: any) :number {
  if(/^([+-])?([0-9]+(\.[0-9]+)?|Infinity)$/.test(variable)) {
    return Number(variable);
  }
  return NaN;
}

export function isInteger(variable :any) :boolean {
  return !isNaN(parseStrictInt(variable));
}
export function isPositiveInteger(variable :any) :boolean {
  const parsed = parseStrictInt(variable);

  return !isNaN(parsed) && parsed > 0;
}
export function isPositiveOrZeroInteger(variable :any) :boolean {
  const parsed = parseStrictInt(variable);

  return !isNaN(parsed) && parsed >= 0;
}
export function isFloat(variable :any) :boolean {
  return !isNaN(parseStrictFloat(variable));
}

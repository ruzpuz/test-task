import { patternValidation } from '../pattern';
import { isNonEmptyString } from "../string";

const emailRegex = '^([A-Za-z0-9._%+-]|"|”|“|\\\\| |“.*”){0,64}([A-Za-z0-9_%+-]|"|”|“|\\\\| |“.*”)@[A-Za-z0-9][A-Za-z0-9.-]*\\.[A-Za-z]{2,}$';

export function isValidEmail(email: any) :boolean {
  if(!isNonEmptyString(email)) {
    return false;
  }
  return (
      patternValidation(email, emailRegex) &&
      !patternValidation(email, '^[\\s\\.]+.*$') &&
      !patternValidation(email, '^.*\\.\\..*$')
  );
}


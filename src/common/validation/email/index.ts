import { patternValidation } from '../pattern';

const emailRegex = '^([A-Za-z0-9._%+-]|"|”|“|\\\\| |“.*”){0,64}([A-Za-z0-9_%+-]|"|”|“|\\\\| |“.*”)@[A-Za-z0-9][A-Za-z0-9.-]*\\.[A-Za-z]{2,}$';

export function isValidEmail(email: any) :boolean {
  if(typeof email !== 'string' ||
    email.startsWith('.') ||
    email.startsWith(' ')) {
    return false;
  }
  return patternValidation(email, emailRegex) &&
    !patternValidation(email, '^.*\\.\\..*$');
}


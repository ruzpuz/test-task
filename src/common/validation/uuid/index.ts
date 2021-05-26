import { v4 as uuidv4 } from 'uuid';
import { patternValidation } from "../pattern";
import { isNonEmptyString } from '../string';

const UUIDPattern = '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

function isUUID(string: string) :boolean {
  return (isNonEmptyString(string) && patternValidation(string, UUIDPattern));
}
function generateUUID() :string {
  return uuidv4();
}

export { isUUID, generateUUID };

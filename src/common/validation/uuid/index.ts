import { v4 as uuidv4 } from 'uuid';

const UUIDPattern = '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

function isValid(text: string, pattern: string) :boolean {
  return (new RegExp(pattern).test(text));
}
function isUUID(string) :boolean {
  return isValid(string, UUIDPattern);
}
function generateUUID() :string{
  return uuidv4();
}

export { isUUID, generateUUID };

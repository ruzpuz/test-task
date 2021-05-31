import { isUUID } from '../common/validation/uuid';
import { User } from '../common/types/User';
import { Database } from '../common/database/Database';

export function isValid(id: string) : boolean {
  return isUUID(id);
}
export async function unlike({ id: who } :User, whom:string) : Promise<boolean> {
  const database = Database.get();
  const sql = `
    DELETE FROM 
      "public"."like"
    WHERE 
      who = ? AND whom = ?`;
  try {
    await database.raw(sql, [ who, whom ]);  
    return true;
  } catch {
    return false;
  }
}
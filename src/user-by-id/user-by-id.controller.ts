import { User } from '../common/types/User';
import { Database } from '../common/database/Database';
import { isUUID } from '../common/validation/uuid';

export function isValid(id: string) : boolean {
  return isUUID(id);
}
export async function findUser(id: string):Promise<{user: User, likes: number}[]> {
  const database = Database.get();

  const sql = `
    WITH likes AS (
      SELECT
        whom AS id,
        count(*) AS likes
      FROM
        "public"."like"
      GROUP BY id
    )
    SELECT
      "user".id AS id,
      email,
      first_name,
      last_name,
      CASE WHEN "likes".likes IS NULL THEN 0 ELSE "likes".likes END AS likes
    FROM
      "public"."user" LEFT JOIN 
      likes ON likes.id = "user".id
    WHERE "user".id = ?;`;
  try {
    const { rowCount, rows } = await database.raw(sql, id);
    if(rowCount === 0) {
      return [];
    }
    return [ {
      user: {
        id: rows[0].id,
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        email: rows[0].email
      },
      likes: rows[0].likes
    } ];
  } catch {
    return null;
  }
}
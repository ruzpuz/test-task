import {Database} from "../common/database/Database";
import {User} from "../common/types/User";

interface DatabaseResult { id:string, first_name: string, last_name: string, email:string, likes:number }
export async function fetchUsers(): Promise<Array<{ likes: number, user:User}>> {
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
    ORDER BY likes DESC;
    `;
    try {
        const { rows } : { rows: Array<DatabaseResult> } = await database.raw(sql);
        return rows.map(row => {
            return {
                user: {
                    id: row.id,
                    firstName: row.first_name,
                    lastName: row.last_name,
                    email: row.email
                },
                likes:row.likes
            };

        });
    } catch {
        return null;
    }
}
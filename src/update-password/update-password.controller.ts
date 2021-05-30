import { Database } from "../common/database/Database";
import keccak from "keccak";
/*
*   TODO - Once the password is update all refresh tokens of that user should be invalidated in order to enforce
*          re-login wherever that user was logged in. Not in the scope of this application.
*  */

export async function updatePassword({ password }: { password: string }, { id }: { id: string}): Promise<boolean> {
    const database = Database.get();
    const sql = `
        UPDATE
            "public"."security"
        SET
            security = ?
        WHERE
            user_id = ? 
    `;
    try {
        await database.raw(sql, [
            keccak('keccak512').update(password).digest('hex'),
            id
        ]);
        return true;
    } catch {
        return false;
    }
}
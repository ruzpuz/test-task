import {Database, DatabaseErrors} from "../common/database/Database";
import {User} from "../common/types/User";
import {DatabaseError} from "pg";
import {isUUID} from "../common/validation/uuid";

export enum Status {
    OK,
    DUPLICATE,
    NO_USER,
    UNKNOWN_ERROR,
    SELF_LIKE
}
export function isValid(id: string) : boolean {
    return isUUID(id);
}
export async function like({ id: who } :User, whom:string) : Promise<Status> {
    if(who === whom) {
        return Status.SELF_LIKE;
    }
    const database = Database.get();
    const sql = `
        INSERT INTO
          "public"."like" (who, whom)
        VALUES (?, ?) ;
    `;
    try {
        await database.raw(sql, [ who, whom ]);
        return Status.OK;
    } catch(error) {
        if (error instanceof DatabaseError) {
            if(error.code === DatabaseErrors.DUPLICATE_KEY){
                return Status.DUPLICATE;
            } else if(error.code === DatabaseErrors.FOREIGN_KEY_VIOLATION) {
                return Status.NO_USER;
            }
        }
        return Status.UNKNOWN_ERROR
    }

}
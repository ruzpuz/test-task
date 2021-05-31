import {Database, DatabaseErrors} from "../common/database/Database";
import {User} from "../common/types/User";
import {DatabaseError} from "pg";
import {isUUID} from "../common/validation/uuid";

export enum Status {
    OK,
    DUPLICATE,
    NO_USER,
    UNKNOWN_ERROR
}
export function isValid(id: string) : boolean {
    return isUUID(id);
}
export async function like({ id: who } :User, whom:string) : Promise<Status> {
    const database = Database.get();
    const sql = `
        INSERT INTO
          "public"."likes" (who, whom)
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
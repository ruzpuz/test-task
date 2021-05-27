import keccak from 'keccak';
import { DatabaseError } from 'pg';
import { Body } from "./signup.dto";
import { isValidEmail } from "common/validation/email";
import { isNonEmptyString } from "common/validation/string";
import { Database, DatabaseErrors } from "../common/database/Database";

export enum Status {
    OK,
    DUPLICATE,
    UNKNOWN_ERROR
}

function prepareData({ email, firstName, lastName, password}:Body) :Body{
    return {
        email: email.toLowerCase(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        password: keccak('keccak512').update(password).digest('hex')
    }
}
export function isValid({ email, firstName, lastName, password }: Body): boolean {
    return (
        isValidEmail(email) &&
        isNonEmptyString(lastName) &&
        isNonEmptyString(firstName) &&
        isNonEmptyString(password)
    );
}
export async function registerUser(body: Body): Promise<Status> {
    const database = Database.get();
    const createNewUserSQL = `
      WITH inserted_user AS (
        INSERT INTO
          "public"."user" (email, first_name, last_name)
        VALUES
          (?, ?, ?)
        RETURNING id
      ),
      inserted_security AS (
        INSERT INTO 
          "public"."security" (user_id, security, confirmation_token, confirmed)
        SELECT id, ?, ?, ? FROM inserted_user
      )
     INSERT INTO
      "public"."users_roles" (user_id, role_id)
      SELECT (SELECT id FROM inserted_user), (SELECT id FROM "public"."role" WHERE name = 'user');`

    const { email, firstName, lastName, password } = prepareData(body);

    try {
       await database.raw(createNewUserSQL, [
           email,
           firstName,
           lastName,
           password,
           '',
           true
        ]);
    } catch (error) {
        if (error instanceof DatabaseError && error.code === DatabaseErrors.DUPLICATE_KEY) {
            return Status.DUPLICATE;
        }
        return Status.UNKNOWN_ERROR;
    }
    return Status.OK;
}
import keccak from 'keccak';
import { Body, LoginResponseData } from './login.dto';
import { isValidEmail } from 'common/validation/email';
import { isNonEmptyString } from 'common/validation/string';
import { Database } from 'common/database/Database';
import { User } from 'common/types/User';
import { Security } from 'security/security.controller';

function prepareData({ email, password }:Body) :Body{
  return {
    email: email.toLowerCase(),
    password: keccak('keccak512').update(password).digest('hex')
  };
}

export enum Status {
    OK,
    NOT_FOUND,
    NOT_CONFIRMED,
    DISABLED,
    UNKNOWN_ERROR
}
export interface Result {
    user?: User,
    status: Status
}
export function isValid({ email, password }: Body): boolean {
  return (
    isValidEmail(email) &&
        isNonEmptyString(password)
  );
}
export async function login(body: Body): Promise<Result> {
  const { email, password } = prepareData(body);
  const response: Result = {
    status: Status.UNKNOWN_ERROR,
    user: null
  };
  const database = Database.get();

  const findUserSQL = `
      SELECT
        u.id AS id,
        u.first_name,
        u.last_name,
        u.email,
        r.id AS role_id,
        r.name AS role_name
      FROM 
        "public"."user" AS u
      JOIN
        "public"."users_roles" AS ur on ur.user_id = u.id
      JOIN
        "public"."role" AS r ON r.id = ur.role_id
      WHERE 
        u.email = ?`;
  const findUserSecurity = `
      SELECT 
        *
      FROM 
        "public"."security"
      WHERE
        user_id = ?
    `;

  await database.transaction(async (t) => {
    const { rows: users, rowCount: count } = await t.raw(findUserSQL, email);

    if(count !== 1) {
      response.status = Status.NOT_FOUND;
      return;
    }
    const { rows: security } = await t.raw(findUserSecurity, users[0].id);

    if(password === security[0].security) {
      if(!security[0].confirmed) {
        response.status = Status.NOT_CONFIRMED;
        return;
      } else if(security[0].disabled) {
        response.status = Status.DISABLED;
        return;
      }
      response.status = Status.OK;
      response.user = {
        id: users[0].id,
        firstName: users[0].first_name,
        lastName: users[0].last_name,
        email: users[0].email,
        role: {
          id: users[0].role_id,
          name: users[0].role_name
        }
      };
      return;
    }
    response.status = Status.NOT_FOUND;
  });

  return response;
}
export function prepareResponse(user: User): LoginResponseData {
  const security = Security.get();

  const accessToken = security.generateAccessToken(user, true);
  const refreshToken = security.generateRefreshToken(user);

  delete user.exp;
  delete user.iat;

  return { user, accessToken, refreshToken };
}
export enum Status {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    FOUND = 302,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501
}
export type Methods =
    'CONNECT' |
    'DELETE' |
    'GET' |
    'HEAD' |
    'OPTIONS' |
    'POST' |
    'PUT' |
    'TRACE';

export interface Response {
    status: Status;
    message?: string;
    data?: object;
}
export interface Responses {
    [key: string] : Response
}
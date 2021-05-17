declare namespace response {
    export enum HTTTPStatus {
        OK = 200,
        CREATED = 201,
        FOUND = 302,
        BAD_REQUEST = 400,
        UNAUTHORIZED = 401,
        FORBIDDEN = 403,
        NOT_FOUND = 404,
        CONFLICT = 409,
        INTERNAL_SERVER_ERROR = 500,
        NOT_IMPLEMENTED = 501
    }
    export interface Response {
        status: HTTTPStatus;
        message?: string;
        data?: object;
    }
    export interface Responses {
        [key: string] : Response
    }

}
export = response;

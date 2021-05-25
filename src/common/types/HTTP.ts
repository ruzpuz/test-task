import { PathPatternWithParams } from "path-pattern";

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
export enum Method {
    'CONNECT' = 'CONNECT',
    'DELETE' = 'DELETE',
    'GET' = 'GET' ,
    'HEAD' = 'HEAD',
    'OPTIONS' = 'OPTIONS' ,
    'POST' = 'POST' ,
    'PUT' = 'PUT' ,
    'TRACE' = 'TRACE'
}

export interface Response {
    status: Status;
    message?: string;
    data?: object;
}
export interface Responses {
    [key: string] : Response
}

export class Route {
    private method: Method;
    private pattern: string;

    private matchesMethod(method) :boolean {
        return (method === this.method);
    }
    private matchesPattern(baseUrl) :boolean {
        return !!(new PathPatternWithParams(this.pattern)).match(baseUrl);
    }
    public isExact(pattern: string, method: string) :boolean {
        return this.matchesMethod(method) && pattern === this.pattern;
    }
    public matches(baseUrl: string, method: string) :boolean{
        return this.matchesMethod(method) && this.matchesPattern(baseUrl);
    }
    constructor(pattern: string, method: Method) {
        this.method = method;
        this.pattern = pattern;

        this.matches = this.matches.bind(this);
        this.matchesPattern = this.matchesPattern.bind(this);
        this.matchesMethod = this.matchesMethod.bind(this);
    }
}
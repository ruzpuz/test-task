import jwt from 'jsonwebtoken';
import {responses} from 'common/response.service';
import {Status, Response, Route, Method} from 'common/types/HTTP';

export class Security {
    private refreshTokens: Array<string>;
    private routes: Array<Route>;
    private static instance: Security;

    public static getUser(token: string): unknown {
        if(!token) {
            return null;
        }
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            //log error and
            return null;
        }
    }
    public static generateAccessToken(user: any): string {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
    }
    public static refreshAccessToken(token :string): Response {
        try {
            const user: any = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            const accessToken = Security.generateAccessToken(user);

            return { status: Status.OK, data: { accessToken } };
        } catch (error) {
            //log error and
            return responses.FORBIDDEN;
        }
    }

    public canRefreshToken(token: string) :boolean {
        return this.refreshTokens.includes(token);
    }
    public shouldEndRequest(token: string, baseUrl :string, method: string) :Response{

        const user = Security.getUser(token);
        const unsecured = !this.routes.find(route => route.matches(baseUrl, method));

        if(unsecured || user) {
            return null;
        }
        return responses.UNAUTHORIZED;
    }
    public registerSecuredRoute(pattern: string, method: Method): number {
        if(!this.routes.find(route => route.isExact(pattern, method))) {
            return this.routes.push(new Route(pattern, method));
        }
        throw new Error('Route already registered');
    }

    private constructor() {
        this.refreshTokens = [];
        this.routes = [];
    }
    public static get(): Security {
        if(!this.instance) {
            this.instance = new Security();
        }
        return this.instance;
    }
}

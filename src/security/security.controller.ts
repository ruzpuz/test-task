import jwt from 'jsonwebtoken';
import {responses} from 'common/response.service';
import { Response, Route, Method} from 'common/types/HTTP';
import { User } from 'common/types/User';

export class Security {
    private refreshTokens: Array<string>;
    private routes: Array<Route>;
    private static instance: Security;

    private static setExpiration(user: User, seconds: number) : User {
        user.iat = Math.floor(Date.now() / 1000) + seconds;
        user.exp = Math.floor(Date.now() / 1000) + seconds;

        return user
    }
    public static getUser(token: string): User {
        if(!token) {
            return null;
        }
        try {
            return <User> jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            console.log(error)
            //log error and
            return null;
        }
    }

    public static generateAccessToken(user: User, expiresIn?: number): string {
        delete user.exp;
        delete user.iat;

        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
    }
    public static generateRefreshToken(user: User): string {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    }
    public static refreshAccessToken(token :string): { accessToken: string } {
        const user: User = <User>jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = Security.generateAccessToken(user, 15);

        return { accessToken };
    }

    public addRefreshToken(token: string): void {
        this.refreshTokens.push(token);
    }
    public removeRefreshToken(token: string): void {
        this.refreshTokens = this.refreshTokens.filter(item => item !== token);
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

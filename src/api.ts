import express from 'express';

type RouteModule = { readonly default: (app: express.Application) => express.RequestHandler };
export type RouteResolver = Promise<RouteModule>;

export const routes: Array<string> = [
    'security/refresh-token/refresh-token.route',
    'signup/signup.route',
    'login/login.route'
];
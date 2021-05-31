import express from 'express';

type RouteModule = { readonly default: (app: express.Application) => express.RequestHandler };
export type RouteResolver = Promise<RouteModule>;

export const routes: Array<string> = [
  'health/health.route',
  'security/refresh-token/refresh-token.route',
  'signup/signup.route',
  'login/login.route',
  'me/me.route',
  'update-password/update-password.route',
  'like/like.route',
  'unlike/unlike.route',
  'most-liked/most-liked.route',
  'user-by-id/user-by-id.route'
];
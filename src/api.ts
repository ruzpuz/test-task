import express from 'express'
import bodyParser from 'body-parser';
import cookieParser  from 'cookie-parser' ;
import security from 'security/security.middleware';

export function includeMiddlewares(app: express.Application): void {
    //logger.info('Including middlewares');
    app.use('/api/*', bodyParser.urlencoded({ extended: true, limit: '20kb' }));

    app.use('/api/*', bodyParser.json({ limit: '20kb' }));

    app.use('/api/*', cookieParser());
    app.use('/api/*', security());
}
export async function includeAPIRoutes (app: express.Application): Promise<void> {
    return Promise.all([
        import('security/refresh-token/refresh-token.route'),
        import('signup/signup.route'),
    ]).then(
        (routes) => routes.forEach(({ default: route }) => route(app))
    ).catch(error => {
        console.log(error);
    });
}
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import security from 'security/security.middleware';

export function includeMiddlewares(app): void {
    //logger.info('Including middlewares');
    app.use('/api/*', bodyParser.urlencoded({ extended: true, limit: '20kb' }));

    app.use('/api/*', bodyParser.json({ limit: '20kb' }));

    app.use(cookieParser());
    app.use('*', security());
}
export async function includeAPIRoutes (app): Promise<void> {
    return Promise.all([
        import('security/refresh-token/refresh-token.route')
    ])
        .then((routes) =>
            routes.forEach(({ default: route }) => {
                route(app);
            })
        );
}
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = 3010;

app.set('port', PORT);


function includeAPIRoutes(): void {}
function includeMiddlewares(): void {
    //logger.info('Including middlewares');
    app.use('/api/*', bodyParser.urlencoded({ extended: true, limit: '20kb' }));

    app.use('/api/*', bodyParser.json({ limit: '20kb' }));

    app.use(cookieParser());
    //app.use('*', security());

}

const server = app.listen(app.get('port'));

includeAPIRoutes();
includeMiddlewares();

export default app;
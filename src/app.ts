import dotenv from 'dotenv';
import express from 'express';
import { RouteResolver, routes} from "./api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import security from "./security/security.middleware";

dotenv.config();

export class App {
    app: express.Application;
    constructor() {
        this.app = express();
        this.app.set('port', process.env.EXPRESS_PORT);
    }
    includeMiddlewares(): void {
        this.app.use('/api/*', bodyParser.urlencoded({ extended: true, limit: '20kb' }));

        this.app.use('/api/*', bodyParser.json({ limit: '20kb' }));

        this.app.use('/api/*', cookieParser());
        this.app.use('/api/*', security());
    }
    async includeApiRoutes() : Promise<void> {
        const resolve : Array<RouteResolver> = routes.map(route => <RouteResolver> import(route));

        return Promise.all(resolve).then((resolved )=>{
            resolved.forEach(({ default: route }) => route(this.app))
        }).catch(error => {
            console.log(error);
        });
    }

    async start(): Promise<void> {
        this.includeMiddlewares();
        await this.includeApiRoutes();

        this.app.listen(this.app.get('port'));
    }
}

import dotenv from 'dotenv';
import express from 'express';
import { includeMiddlewares, includeAPIRoutes} from "./api";

void (async function init() {
    dotenv.config();

    const app = express();
    const PORT = 3010;

    app.set('port', PORT);

    includeMiddlewares(app);
    await includeAPIRoutes(app);

    app.listen(app.get('port'));
})();

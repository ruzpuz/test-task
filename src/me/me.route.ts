import express from "express";
import {sendData} from "../common/response.service";
import {Security} from "../security/security.controller";
import {Method} from "../common/types/HTTP";

function meRoute(request: express.Request, response: express.Response) : express.Response {
    return sendData(response, response.locals.user);
}

export default (app: express.Application) : express.RequestHandler => {
    const pattern = '/api/me';
    const security = Security.get();

    security.registerSecuredRoute(pattern, Method.GET);
    return app.get(pattern, meRoute)
};

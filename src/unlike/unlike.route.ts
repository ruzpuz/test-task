import express from "express";
import {Security} from "../security/security.controller";
import {Method} from "../common/types/HTTP";
import {responses, send} from "../common/response.service";
import { UnlikeRouteParams } from "./unlike.dto";
import { isValid, unlike} from "./unlike.controller";

async function unlikeRoute(request: express.Request<UnlikeRouteParams, never, never>, response: express.Response) : Promise<express.Response> {
    const { USER_UNLIKED, USER_ID_NOT_VALID, INTERNAL_SERVER_ERROR } = responses;

    if(!isValid(request.params.id)) {
        return send(response, USER_ID_NOT_VALID)
    }

    if(await unlike(response.locals.user, request.params.id)) {
        return send(response, USER_UNLIKED);
    }
    return send(response, INTERNAL_SERVER_ERROR);

}
export default (app: express.Application) : express.RequestHandler => {
    const pattern = '/api/user/:id/unlike';
    const security = Security.get();

    security.registerSecuredRoute(pattern, Method.POST);
    return app.post(pattern, unlikeRoute)
};

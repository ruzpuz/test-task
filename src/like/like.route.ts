import express from "express";
import {Security} from "../security/security.controller";
import {Method} from "../common/types/HTTP";
import {responses, send} from "../common/response.service";
import {LikeBody, LikeRouteParams} from "./like.dto";
import {isValid, like, Status} from "./like.controller";
import {User} from "../common/types/User";

async function updatePasswordRoute(request: express.Request<LikeRouteParams, never, LikeBody>, response: express.Response) : Promise<express.Response> {
    const { USER_NOT_FOUND, USER_ALREADY_LIKED, USER_ID_NOT_VALID, USER_SUCCESSFULLY_LIKED, USER_CANNOT_LIKE_THEMSELVES, INTERNAL_SERVER_ERROR } = responses;
    if(!isValid(request.params.id)) {
        return send(response, USER_ID_NOT_VALID);
    }

    const result = await like(<User> response.locals.user, request.params.id);
    if(result === Status.DUPLICATE) {
        return send(response, USER_ALREADY_LIKED);
    } else if(result === Status.NO_USER) {
        return send(response, USER_NOT_FOUND);
    } else if(result === Status.OK) {
        return send(response, USER_SUCCESSFULLY_LIKED);
    } else if(result === Status.SELF_LIKE) {
        return send(response, USER_CANNOT_LIKE_THEMSELVES);
    }
    return send(response, INTERNAL_SERVER_ERROR);

}
export default (app: express.Application) : express.RequestHandler => {
    const pattern = '/api/user/:id/like';
    const security = Security.get();

    security.registerSecuredRoute(pattern, Method.POST);
    return app.post(pattern, updatePasswordRoute)
};

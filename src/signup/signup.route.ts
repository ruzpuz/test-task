import express from "express";
import {responses, send} from 'common/response.service';
import {Body} from "./signup.dto";
import {isValid, registerUser, Status} from "./signup.controller";

async function signupRoute(request: express.Request<never, never, Body>, response: express.Response) : Promise<express.Response> {
    const { BAD_REQUEST, INTERNAL_SERVER_ERROR, USER_SUCCESSFULLY_REGISTERED, USER_ALREADY_REGISTERED } = responses;

    if(!isValid(request.body)) {
        return send(response, BAD_REQUEST);
    }
    const result = await registerUser(request.body);
    if(result === Status.OK) {
        return send(response, USER_SUCCESSFULLY_REGISTERED);
    } else if(result === Status.DUPLICATE) {
        return send(response, USER_ALREADY_REGISTERED);
    }
    return send(response, INTERNAL_SERVER_ERROR);
}

export default (app: express.Application) : express.RequestHandler => app.post('/api/signup', signupRoute);

import express from "express";
import {responses, sendData, send} from "../common/response.service";
import { UserByIdParams } from './user-by-id.dto';
import { isValid, findUser } from "./user-by-id.controller";

async function getUserByIdRoute(request: express.Request<UserByIdParams, never, never>, response: express.Response) : Promise<express.Response> {
    const { USER_ID_NOT_VALID, USER_NOT_FOUND, INTERNAL_SERVER_ERROR } = responses;
    if(!isValid(request.params.id)) {
        return send(response, USER_ID_NOT_VALID);
    }
    const users = await findUser(request.params.id);
    if(!users) {
        return send(response, INTERNAL_SERVER_ERROR);
    } else if(users.length === 0) {
        return send(response, USER_NOT_FOUND);
    }
    return sendData(response, users[0]);
}

export default (app: express.Application) : express.RequestHandler => app.get('/api/user/:id', getUserByIdRoute);

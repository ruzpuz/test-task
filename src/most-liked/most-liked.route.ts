import express from "express";
import {sendData, responses, send} from "../common/response.service";
import { fetchUsers } from './most-liked.controller'

async function meRoute(request: express.Request, response: express.Response) : Promise<express.Response> {
    const { INTERNAL_SERVER_ERROR } = responses;
    const users = await fetchUsers();
    if(!users) {
        send(response, INTERNAL_SERVER_ERROR);
    }
    return sendData(response, users);
}

export default (app: express.Application) : express.RequestHandler => app.get('/api/most-liked', meRoute);

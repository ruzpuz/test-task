import {responses, send, sendData} from 'common/response.service';
import express from "express";
import { Security } from 'security/security.controller';
import { Body } from './refresh-token.dto';

function refreshTokenRoute(request: express.Request<never, never, Body>, response: express.Response) : express.Response{
    const { UNAUTHORIZED, FORBIDDEN } = responses;
    const { token} = request.body;
    const security = Security.get();

    if(!token) {
        return send(response, UNAUTHORIZED);
    }
    if (!security.canRefreshToken(token)) {
        return send(response, FORBIDDEN);
    }
    try {
        return sendData(response, security.refreshAccessToken(token));
    } catch(e) {
        return send(response, FORBIDDEN);
    }
}

export default (app: express.Application) : express.RequestHandler => app.post('/api/token', refreshTokenRoute);
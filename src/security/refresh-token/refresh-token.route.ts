import { responses, send, sendData } from 'src/common/response.service';
import express from "express";
import { refreshAccessToken, refreshTokens } from "src/security/security.controller";

function refreshTokenRoute(request: express.Request, response: express.Response) : express.Response{
    const { UNAUTHORIZED, FORBIDDEN } = responses;
    const { token } = request.body;

    if(!token) {
        return send(response, UNAUTHORIZED);
    }
    if (!refreshTokens.includes(token)) {
        return send(response, FORBIDDEN);
    }
    return send(response, refreshAccessToken(token));
}


export default (app) => app.get('/api/token', refreshTokenRoute);
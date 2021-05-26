import { responses, send } from 'common/response.service';
import express from "express";
import { Security } from 'security/security.controller';

function refreshTokenRoute(request: express.Request<never, never, { token: string}>, response: express.Response) : express.Response{
    const { UNAUTHORIZED, FORBIDDEN } = responses;
    const { token } = request.body;
    const security = Security.get();

    if(!token) {
        return send(response, UNAUTHORIZED);
    }
    if (!security.canRefreshToken(token)) {
        return send(response, FORBIDDEN);
    }
    return send(response, Security.refreshAccessToken(token));
}

export default (app: express.Application) : express.RequestHandler => app.post('/api/token', refreshTokenRoute);
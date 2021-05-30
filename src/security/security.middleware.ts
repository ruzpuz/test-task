import express from 'express';
import { Security } from "security/security.controller";
import { send } from "common/response.service";
import { responses } from "common/response.service";

export default function create():express.RequestHandler {
    return function (request:express.Request, response: express.Response, next:express.NextFunction): express.Response {
        const { UNAUTHORIZED } = responses;
        const security = Security.get();

        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const user = security.getUser(token);

        const halt = security.shouldEndRequest(user, request.baseUrl, request.method);
        if(halt) {
            return send(response, UNAUTHORIZED);
        }
        response.locals.user = user;
        next();
        return null;
    }
}


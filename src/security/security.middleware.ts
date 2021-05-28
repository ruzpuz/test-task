import express from 'express';
import { Security } from "security/security.controller";
import { send } from "common/response.service";
import { responses } from "common/response.service";

export default function create():express.RequestHandler {
    return function (req:express.Request, res: express.Response, next:express.NextFunction): express.Response {
        const { UNAUTHORIZED } = responses;
        const security = Security.get();

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const user = Security.getUser(token);

        const halt = security.shouldEndRequest(user, req.baseUrl, req.method);
        if(halt) {
            return send(res, UNAUTHORIZED);
        }
        next();
        return null;
    }
}


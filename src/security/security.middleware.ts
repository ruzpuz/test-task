import express from 'express';
import { Security } from "security/security.controller";
import {send} from "common/response.service";

export default function create():express.RequestHandler {
    return function (req:express.Request, res: express.Response, next:express.NextFunction): express.Response{
        const security = Security.get();

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const halt = security.shouldEndRequest(token, req.baseUrl, req.method);
        if(halt) {
            return send(res, halt);
        }
        next();
        return null;
    }
}


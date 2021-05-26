import express from "express";
import { responses, send } from 'common/response.service';
import { Body } from "./signup.dto";
import { isValid } from "./signup.controller";

function signupRoute(request: express.Request<never, never, Body>, response: express.Response) : express.Response{
    const { BAD_REQUEST, NOT_IMPLEMENTED} = responses;

    if(!isValid(request.body)) {
        return send(response, BAD_REQUEST);
    }

    return send(response, NOT_IMPLEMENTED);
}
export default (app: express.Application) : express.RequestHandler => app.post('/api/signup', signupRoute);

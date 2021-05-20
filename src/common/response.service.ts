import express from 'express';
import {Status, Response, Responses} from './types/HTTP';

export function send(res:express.Response, response: Response): express.Response {
    return res.status(response.status).json({ message: response.message, ...response.data});
}
export function sendData(res:express.Response, data: object):  express.Response {
    return send(res, { status: Status.OK, data})
}
export function sendNoData(res:express.Response): express.Response{
    return res.sendStatus(Status.NO_CONTENT);
}

export const responses: Responses = {
    UNAUTHORIZED: { status: Status.UNAUTHORIZED, message: 'You are not authorized to access this' },
    FORBIDDEN: { status: Status.FORBIDDEN, message: 'You are not allowed to see this' },
    UNKNOWN_SERVER_ERROR: { status: Status.INTERNAL_SERVER_ERROR, message: 'Something failed' },
}
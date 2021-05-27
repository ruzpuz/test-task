import express from 'express';
import {Response, Responses, Status} from './types/HTTP';

export function send(res:express.Response, response: Response): express.Response {
    return res.status(response.status).json({ message: response.message, ...response.data});
}
export function sendData(res:express.Response, data: Record<string, unknown>):  express.Response {
    return send(res, { status: Status.OK, data})
}
export function sendNoData(res:express.Response): express.Response{
    return res.sendStatus(Status.NO_CONTENT);
}

export const responses: Responses = {
    UNAUTHORIZED: { status: Status.UNAUTHORIZED, message: 'You are not authorized to access this' },
    FORBIDDEN: { status: Status.FORBIDDEN, message: 'You are not allowed to see this' },
    BAD_REQUEST: { status: Status.BAD_REQUEST, message: 'Malformed request'},
    NOT_IMPLEMENTED: { status: Status.NOT_IMPLEMENTED, message: 'Route under construction'},
    INTERNAL_SERVER_ERROR: { status: Status.INTERNAL_SERVER_ERROR, message: 'Something failed' },
    USER_SUCCESSFULLY_REGISTERED: { status: Status.CREATED, message: 'Successful registration' },
    USER_ALREADY_REGISTERED: { status: Status.CONFLICT, message: 'User already registered' },
}
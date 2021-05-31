import express from 'express';
import { Response, Responses, Status } from './types/HTTP';

export function send(res:express.Response, response: Response): express.Response {
  if(Array.isArray(response.data)) {
    return res.status(response.status).json(response.data);
  }
  return res.status(response.status).json({ message: response.message, ...response.data });
}
export function sendData(res:express.Response, data: Record<string, unknown> | Array<Record<string, unknown>>): express.Response {
  return send(res, { status: Status.OK, data });
}
export function sendNoData(res:express.Response): express.Response{
  return res.sendStatus(Status.NO_CONTENT);
}

export const responses: Responses = {
  UNAUTHORIZED: { status: Status.UNAUTHORIZED, message: 'You are not authorized to access this' },
  FORBIDDEN: { status: Status.FORBIDDEN, message: 'You are not allowed to see this' },
  BAD_REQUEST: { status: Status.BAD_REQUEST, message: 'Malformed request' },
  NOT_IMPLEMENTED: { status: Status.NOT_IMPLEMENTED, message: 'Route under construction' },
  HEALTH_OK: { status: Status.OK, message: 'Application running normally' },
  HEALTH_NOT_OK: { status: Status.INTERNAL_SERVER_ERROR, message: 'Application is not running normally' },
  INTERNAL_SERVER_ERROR: { status: Status.INTERNAL_SERVER_ERROR, message: 'Something failed' },
  USER_SUCCESSFULLY_REGISTERED: { status: Status.CREATED, message: 'Successful registration' },
  USER_ALREADY_REGISTERED: { status: Status.CONFLICT, message: 'User already registered' },
  USER_NOT_FOUND: { status: Status.NOT_FOUND, message: 'User not found' },
  USER_DISABLED: { status: Status.FORBIDDEN, message: 'User is disabled' },
  USER_NOT_CONFIRMED: { status: Status.FORBIDDEN, message: 'User is not confirmed' },
  USER_PASSWORD_UPDATED: { status: Status.OK, message: 'Successfully updated password' },
  USER_ID_NOT_VALID: { status: Status.BAD_REQUEST, message: 'Invalid user id' },
  USER_SUCCESSFULLY_LIKED: { status: Status.OK, message: 'User successfully liked' },
  USER_ALREADY_LIKED: { status: Status.CONFLICT, message: 'User already liked' },
  USER_CANNOT_LIKE_THEMSELVES: { status: Status.BAD_REQUEST, message: 'You cannot like yourself' },
  USER_UNLIKED: { status: Status.OK, message: 'User is unliked' }
};
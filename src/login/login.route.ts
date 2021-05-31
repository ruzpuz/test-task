import express from 'express';
import { responses, send, sendData } from 'common/response.service';
import { Body, LoginResponseData } from './login.dto';
import { isValid, login, prepareResponse, Status } from './login.controller';
import { Security } from '../security/security.controller';

async function loginRoute(request: express.Request<never, never, Body>, response: express.Response) : Promise<express.Response> {
  const { BAD_REQUEST, INTERNAL_SERVER_ERROR, USER_NOT_FOUND, USER_DISABLED, USER_NOT_CONFIRMED } = responses;

  if(!isValid(request.body)) {
    return send(response, BAD_REQUEST);
  }
  const { status, user } = await login(request.body);
  if(status === Status.DISABLED) {
    return send(response, USER_DISABLED);
  } else if(status === Status.NOT_FOUND) {
    return send(response, USER_NOT_FOUND);
  } else if(status === Status.NOT_CONFIRMED) {
    return send(response, USER_NOT_CONFIRMED);
  } else if(status === Status.UNKNOWN_ERROR) {
    return send(response, INTERNAL_SERVER_ERROR);
  }

  const data :LoginResponseData = prepareResponse(user);

  Security.get().addRefreshToken(data.refreshToken);

  return sendData(response, data);
}

export default (app: express.Application) : express.RequestHandler => app.post('/api/login', loginRoute);

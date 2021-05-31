import express from 'express';
import { responses, send } from '../common/response.service';
import { Security } from '../security/security.controller';
import { Method } from '../common/types/HTTP';
import { Body } from './update-password.dto';
import { updatePassword } from './update-password.controller';

async function updatePasswordRoute(request: express.Request<never, never, Body>, response: express.Response) : Promise<express.Response> {
  const { USER_PASSWORD_UPDATED, INTERNAL_SERVER_ERROR } = responses;

  if(await updatePassword(request.body, response.locals.user)) {
    return send(response, USER_PASSWORD_UPDATED);
  }
  return send(response, INTERNAL_SERVER_ERROR);
}

export default (app: express.Application) : express.RequestHandler => {
  const pattern = '/api/me/update-password';
  const security = Security.get();

  security.registerSecuredRoute(pattern, Method.POST);
  return app.post(pattern, updatePasswordRoute);
};

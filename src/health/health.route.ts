import express from 'express';
import { responses, send } from '../common/response.service';
import { checkHealth } from './health.controller';

async function healthRoute(request: express.Request, response: express.Response) : Promise<express.Response> {
  const { HEALTH_OK, HEALTH_NOT_OK } = responses;

  try {
    await checkHealth();
    return send(response, HEALTH_OK);
  } catch {
    return send(response, HEALTH_NOT_OK);
  }
}

export default (app: express.Application) : express.RequestHandler => app.get('/api/health', healthRoute);

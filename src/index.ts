import { App } from './app';
import dotenv from 'dotenv';

void (async (): Promise<void> => {
  dotenv.config();

  const app = new App();
  await app.start();
})();
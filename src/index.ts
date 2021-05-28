import {App} from './app';

void (async (): Promise<void> => {
    const app = new App();
    await app.start();
})();
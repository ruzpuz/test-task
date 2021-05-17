import refreshTokens  from '../security.middleware';

async function refreshTokenRoute(req, res) {
    const { token } = req.body;

}
export default (app) => app.get('/api/token', refreshTokenRoute);
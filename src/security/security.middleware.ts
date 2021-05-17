import jwt from 'jsonwebtoken';

const refreshTokens = [];
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
function create():Function {
    return function (req, res, next):void {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

    }
}

export default { create, refreshTokens };
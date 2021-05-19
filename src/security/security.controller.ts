import jwt from 'jsonwebtoken';
import {responses} from "src/common/response.service";
import {HTTTPStatus, Response} from "src/common/response";

export const refreshTokens = [];
export function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
export function refreshAccessToken(token :string): Response {
    try {
        const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken({ name: user.name });

        return { status: HTTTPStatus.OK, data: { accessToken } };
    } catch (error) {
        //log error and
        return responses.FORBIDDEN;
    }
}
export function getUser(token: string): unknown {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        //log error and
        return null;
    }
}
export function shouldEndRequest(token: string, baseUrl :string, method: string) :boolean{
    const user = getUser(token);

    return true;
}
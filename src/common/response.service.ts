import { Response, HTTTPStatus, Responses } from './response';

export function created(message:string) : Response {
    return { status: HTTTPStatus.CREATED, message };
}
export function success(message:string) : Response {
    return { status: HTTTPStatus.OK, message };
}
export const responses: Responses = {
    UNAUTHORIZED: { status: HTTTPStatus.UNAUTHORIZED, message: 'You are not authorized to see this' },
    FORBIDDEN: { status: HTTTPStatus.FORBIDDEN, message: 'You are not allowed to see this' },
    UNKNOWN_SERVER_ERROR: { status: HTTTPStatus.INTERNAL_SERVER_ERROR, message: 'Something failed' },
}
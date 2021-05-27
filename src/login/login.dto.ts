import {User} from "../common/types/User";

export interface Body {
    email: string,
    password: string
}
export type ResponseData = {
    user: User
    message?: ''
    accessToken: string,
    refreshToken: string
}
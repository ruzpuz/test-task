import {User} from "../common/types/User";

export interface Body {
    email: string,
    password: string
}
export type LoginResponseData = {
    user: User
    message?: ''
    accessToken: string,
    refreshToken: string
}
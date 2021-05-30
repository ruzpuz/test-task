export interface Role {
    id: string
    name: string
}
export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role:Role,
    iat?: number,
    exp?: number
}
export interface Role {
    id: string
    name: string
}
export interface User {
    firstName: string,
    lastName: string,
    email: string,
    role:Role
}
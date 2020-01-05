export interface IUser {
    name: string
    email: string
    permissions: string[]
    token: string
    sessionExp?: Date
}

export interface IAuthContext {
    user?: IUser
    authenticate(email:string,password:string): Promise<void>
    logout(): void
    verifyPermissions(permissions: string[]): boolean
    verifySession(): boolean
}
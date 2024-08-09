import { RoleInterface } from "./RoleInterface"

export interface UserInterface {
    userId?: number
    firstName?: string
    lastName?: string
    username?: string
    password?: string
    role?: RoleInterface
}
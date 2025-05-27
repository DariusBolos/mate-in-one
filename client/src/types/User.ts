import {Avatar} from "./Avatar";

export type User = {
    _id: string | null,
    username: string,
    email: string,
    password: string,
    createdDate: Date | null,
    avatar : Avatar
} 
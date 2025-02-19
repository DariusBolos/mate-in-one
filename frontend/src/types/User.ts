import Avatar from "./Avatar";

export default interface type {
    _id: String | null,
    username: String,
    email: String,
    password: String,
    createdDate: Date | null,
    avatar : Avatar
} 
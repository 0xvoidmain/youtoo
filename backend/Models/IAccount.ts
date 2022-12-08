import mongoose from "mongoose";

enum IAccountRole {
    User = 'User',
    Moderator = 'moderator',
    Admin = 'admin'
}

export interface IAccount {
    _id: mongoose.Types.ObjectId
    role: IAccountRole
    address: string
    name: string
}
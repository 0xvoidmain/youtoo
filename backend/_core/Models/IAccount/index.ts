import mongoose from "mongoose";
import { Mongo } from "../../MongoDB"

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
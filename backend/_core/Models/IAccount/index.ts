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

export async function RegisterOrLoginWithAddress(address, name) {
    return await Mongo<IAccount>('Account').findOneAndUpdate({
        address: address
    }, {
        $setOnInsert: {
            address,
            name
        }
    }, {
        upsert: true,
        new: true
    })
}
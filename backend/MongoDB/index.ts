import mongoose, { Model } from "mongoose"
import config from "../config"
import { IAccount } from "../Models/IAccount"


var connected = false
export async function MongoDBConnect() {
    if (connected) return

    return new Promise((resolve, reject) => {
        mongoose.connect(config.MONGODB.URI, {
            // maxPoolSize: 1300,
            // maxIdleTimeMS: 60000
        }, (err) => {
            if (err) {
                console.error('Cannot connect to Mongodb', err)
                return reject(err)
            }
            else {
                connected = true
                console.log('> Connected mongodb')
                return resolve(true)
            }
        })    
    })
}

function Schema<T>() {
    return new mongoose.Schema<T>({
    }, {
        timestamps: true,
        strict: false
    })
}

const SchemaStore = {

}

export function Mongo<T>(
        collection: string
    ): Model<T> {
    if (!SchemaStore[collection]) {
        SchemaStore[collection] = mongoose.model(collection, Schema<T>(), collection)
    }
    return SchemaStore[collection]
}

// export var Account = mongoose.model('Account', Schema<IAccount>(), 'Account')

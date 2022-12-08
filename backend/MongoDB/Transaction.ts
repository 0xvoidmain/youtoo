import mongoose from "mongoose";

export function Transaction<T, P>(func: (session: mongoose.ClientSession, args?: T) => Promise<P>) {
    return async (args?: T) => {
        let session = await mongoose.startSession()
        var error = null
        var result: P = null
        try {
            await session.withTransaction(async () => {
                result = await func(session, args)
            })
        }
        catch (ex) {
            error = ex
        }

        await session.endSession()
        
        if (error) throw error
        return result
    }
}
import { AzureFunction } from "@azure/functions"

export function isAdmin(func: AzureFunction) {
    return async (context, req) => {
        if (!context.bindings._isAdmin()) throw "You don't have permission. Only Admin can do"

        return await func(context, req)
    }
} 
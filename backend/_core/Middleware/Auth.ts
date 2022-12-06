import { HTTPFunction, HTTPRequest } from "../../HTTPFunction";
import { verifyToken } from "../Service/JWT"
export interface IUserAuth {
    userId: string
    role: number
}

export function Auth(func: HTTPFunction) {
    return async (req: HTTPRequest) => {
        const body = req.body || {};

        var AccessToken = req.headers['authorization'] 
            || (req.body || {})['authorization'] 
            || (req.query || {})['authorization']
            || (body.FunctionArgument || {}).authorization
        
        delete req.headers['authorization'] 
        delete (req.body || {})['authorization'] 
        delete (req.query || {})['authorization']
        try {
            var jwtData = verifyToken(AccessToken)
    
            req._auth = () => ({
                userId: jwtData.userId,
                name: jwtData.name || jwtData.userId,
                role: jwtData.role
            })
        }
        catch (ex) {
            req._auth = () => ({
                userId: 'anonymous',
                name: 'Anonymous',
                role: 1
            })
        }

        return await func(req)
    }
} 
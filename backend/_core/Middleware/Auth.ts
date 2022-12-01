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
            

        if (!AccessToken) {
            throw "Missing AccessToken"
        }
        
        delete req.headers['authorization'] 
        delete (req.body || {})['authorization'] 
        delete (req.query || {})['authorization']
        
        var jwtData = verifyToken(AccessToken)

        req._auth = () => ({
            userId: jwtData.userId,
            role: jwtData.role
        })

        return await func(req)
    }
} 
import { RegisterOrLoginWithAddress } from "../../_core/Models/IAccount";
import { issueToken } from "../../_core/Service/JWT";
import { HTTPRequest } from "../../HTTPFunction";

export default async function Auth(req: HTTPRequest<{ address: string, name: string}>) {
    var { address, name } = req.body
    
    var account = await RegisterOrLoginWithAddress(address, name)
    var AccessToken = issueToken(account._id, 1)

    return {
        AccessToken,
        AccessTokenExpireTime: new Date().getTime() + 24 * 60 * 60 * 1000 - 60 * 1000
    }
};
import { issueToken } from "../../_core/Service/JWT";
import { HTTPRequest } from "../../HTTPFunction";
import { IAccount } from "../../_core/Models/IAccount";
import { Mongo } from "../../_core/MongoDB";

export default async (req: HTTPRequest<{ address: string, name: string}>) => {
    var { address, name } = req.body
    
    var account = await await Mongo<IAccount>('Account').findOneAndUpdate({
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

    var AccessToken = issueToken(account._id, 1)

    return {
        AccessToken,
        AccessTokenExpireTime: new Date().getTime() + 24 * 60 * 60 * 1000 - 60 * 1000
    }
};
import { issueToken } from "../../Service/JWT";
import { HTTPRequest } from "../../HTTPFunction";
import { IAccount } from "../../Models/IAccount";
import { Mongo } from "../../MongoDB";

export default async (req: HTTPRequest<{ address: string, name: string}>) => {
    var { address, name } = req.body
    
    var account = await await Mongo<IAccount>('Account').findOneAndUpdate({
        address: address
    }, {
        $set: {
            address,
            name
        }
    }, {
        upsert: true,
        new: true
    })

    console.log(account)

    var AccessToken = issueToken(account._id, account.name, 1)

    return {
        userId: account._id,
        name: account.name,
        AccessToken,
        AccessTokenExpireTime: new Date().getTime() + 24 * 60 * 60 * 1000 - 60 * 1000
    }
};
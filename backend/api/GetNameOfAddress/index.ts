import { issueToken } from "../../Service/JWT";
import { HTTPRequest } from "../../HTTPFunction";
import { IAccount } from "../../Models/IAccount";
import { Mongo } from "../../MongoDB";

export default async (req: HTTPRequest<{ address: string}>) => {
    var { address } = req.body
    
    var account = await await Mongo<IAccount>('Account').findOne({
        address: address
    })

    return account ? account.name : ''
};
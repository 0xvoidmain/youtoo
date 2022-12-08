import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../MongoDB";

export default async (req: HTTPRequest) => {
    return await Mongo<IChallenge>('Challenge').find({
        
    })
}
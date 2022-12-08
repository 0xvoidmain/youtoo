import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../MongoDB";

export default async (req: HTTPRequest<{
    challengeId: string
}>) => {
    return await Mongo<IChallenge>('Challenge').findOneAndUpdate({
        _id: req.body.challengeId
    }, {
        $inc: {
            "likes": 1
        }
    }, {
        new: true
    })
}
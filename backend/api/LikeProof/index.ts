import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../_core/MongoDB";

export default async (req: HTTPRequest<{
    challengeId: string,
    proofId: number
}>) => {
    return await Mongo('Challenge').findOneAndUpdate({
        _id: req.body.challengeId,
        [`players.${req._auth().userId}.proofOfWorks.${req.body.proofId}`]: {
            $exists: true
        }
    }, {
        $inc: {
            [`players.${req._auth().userId}.proofOfWorks.$.likes`]: 1
        }
    }, {
        new: true
    })
}
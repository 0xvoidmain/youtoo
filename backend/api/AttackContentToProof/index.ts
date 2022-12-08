import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../_core/MongoDB";

export default async (req: HTTPRequest<{
    challengeId: string,
    proofId: number,
    content: string,
    image: string
}>) => {
    return await Mongo('Challenge').findOneAndUpdate({
        _id: req.body.challengeId,
        [`players.${req._auth().userId}.proofOfWorks.${req.body.proofId}`]: {
            $exists: true
        }
    }, {
        $set: {
            [`players.${req._auth().userId}.proofOfWorks.${req.body.proofId}`]: {
                content: req.body.content,
                image: req.body.image
            } as IChallengeProof
        }
    }, {
        new: true
    })
}
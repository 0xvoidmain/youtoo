import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../MongoDB";

export default async (req: HTTPRequest<{
    challengeId: string
}>) => {
    return await Mongo('Challenge').findOneAndUpdate({
        _id: req.body.challengeId,
        [`players.${req._auth().userId}`]: {
            $exists: true
        }
    }, {
        $push: {
            [`players.${req._auth().userId}.proofOfWorks`]: {
                submitedAt: Date.now(),
                image: '',
                content: '',
                likes: 0,
                comments: [],
                extraData: {},
                verified: false
            } as IChallengeProof
        }
    }, {
        new: true
    })
}
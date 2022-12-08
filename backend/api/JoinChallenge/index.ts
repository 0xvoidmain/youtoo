import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../MongoDB";
import LikeChallenge from "../LikeChallenge";

export default async (req: HTTPRequest<{
    challengeId: string
}>) => {
    await LikeChallenge(req)
    
    return await Mongo<IChallenge>('Challenge').findOneAndUpdate({
        _id: req.body.challengeId,
        [`player.${req._auth().userId}`]: {
            $exists: false
        }
    }, {
        $set: {
            players: {
                [`${req._auth().userId}`]: {
                    name: req._auth().name,
                    joinedAt: Date.now(),
                    proofOfWorks: []
                } as IChallengePlayer
            }
        },
        $inc: {
            participants: 1
        }
    }, {
        new: true
    })
}
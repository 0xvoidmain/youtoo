import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../_core/MongoDB";

export default async (req: HTTPRequest<{
    challengeId: string
    commentId: number
}>) => {
    return await Mongo<IChallenge>('Challenge').findOneAndUpdate({
        _id: req.body.challengeId,
        [`comments.${req.body.commentId}`]: {
            $exists: true
        }
    }, {
        $inc: {
            [`comments.${req.body.commentId}.likes`]: 1
        }
    }, {
        new: true
    })
}
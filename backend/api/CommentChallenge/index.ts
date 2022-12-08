import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../MongoDB";

export default async (req: HTTPRequest<{
    challengeId: string,
    comment: string
}>) => {
    return await Mongo<IChallenge>('Challenge').findOneAndUpdate({
        _id: req.body.challengeId,
    }, {
        $push: {
            comments: {
                userId: req._auth().userId,
                name: req._auth().name,
                comment: req.body.comment,
                likes: 0
            } as IComment
        }
    }, {
        new: true
    })
}
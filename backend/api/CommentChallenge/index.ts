import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../_core/MongoDB";

export default async (req: HTTPRequest) => {
    return await Mongo('Challenge').findOneAndUpdate({
        _id: req.body.challengeId,
    }, {
        $push: {
            comments: {
                userId: req._auth().userId,
                name: req._auth().name,
                comment: req.body.comment,
                likes: 0
            }
        }
    }, {
        new: true
    })
}
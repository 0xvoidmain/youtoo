import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../_core/MongoDB";

export default async (req: HTTPRequest) => {
    return await Mongo('Challenge').findOneAndUpdate({
        _id: req.body.challengeId,
        'comments': {
            $elemMatch: {
                createdAt: req.body.commentedAt,
                userId: req.body.userId
            }
        }
    }, {
        $inc: {
            "comments.$.likes": 1
        }
    }, {
        new: true
    })
}
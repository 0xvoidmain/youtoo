import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../_core/MongoDB";

export default async (req: HTTPRequest) => {
    return await Mongo('Challenge').findOneAndUpdate({
        _id: req.body.challengeId,
        [`player_${req._auth().userId}`]: {
            $exists: false
        }
    }, {
        $set: {
            [`player_${req._auth().userId}`]: {
                name: req._auth().name,
                joinedAt: Date.now()
            }
        },
        $inc: {
            participants: 1
        }
    }, {
        new: true
    })
}
import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../MongoDB";
import ChallengeTemplates from "../ChallengeTemplate/ChallengeTemplates";

export default async (req: HTTPRequest<{
    templateId: number
}>) => {
    var {
        templateId,
        ...params
    } = req.body

    var template = ChallengeTemplates.find(e => e.templateId == templateId)

    var challenge = template.create(params)

    return await Mongo<IChallenge>('Challenge').create({
        creator: req._auth().userId,
        ...challenge,
        participants: 0,
        likes: 0,
        comments: [],
        players: [],
        template
    })
}
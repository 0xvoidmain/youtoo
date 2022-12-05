import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../_core/MongoDB";
import ChallengeTemplates from "../ChallengeTemplate/ChallengeTemplates";

export default async (req: HTTPRequest) => {
    var {
        templateId,
        ...params
    } = req.body

    var template = ChallengeTemplates.find(e => e.templateId == templateId)

    var challenge = template.create(params)

    return await Mongo('Challenge').create({
        ...challenge,
        creator: req._auth().userId
    })
}
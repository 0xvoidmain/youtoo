import { HTTPRequest } from "../../HTTPFunction";
import { Mongo } from "../../_core/MongoDB";

export default async (req: HTTPRequest) => {
    return await Mongo('Challenge').find()
}
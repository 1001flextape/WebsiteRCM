import addOne from "./scripts/projectMain/addOne.script"
import getMany from "./scripts/projectMain/getMany.script"
import deleteOne from "./scripts/projectMain/deleteOne.script"
import getManyWithPagination from "./scripts/projectMain/getManyWithPagination.script"
import getOneById from "./scripts/projectMain/getOneById.script"
import updateOne from "./scripts/projectMain/updateOne.script"
import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import getCurrentSummary from "./scripts/projectMain/getCurrentSummary.script"
import updateCurrentOne from "./scripts/projectMain/updateCurrentOne.script"
import getCurrentOne from "./scripts/projectMain/getCurrentOne.script"

export default function makeBackendProjectMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getCurrentOne: getCurrentOne(d),
    getCurrentSummary: getCurrentSummary(d),
    getMany: getMany(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
    updateCurrentOne: updateCurrentOne(d),
  }
}
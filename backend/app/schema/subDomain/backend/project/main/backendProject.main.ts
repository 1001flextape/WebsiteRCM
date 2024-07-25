import addOne from "./scripts/projectMain/addOne.script"
import getMany from "./scripts/projectMain/getMany.script"
import deleteOne from "./scripts/projectMain/deleteOne.script"
import getManyWithPagination from "./scripts/projectMain/getManyWithPagination.script"
import getOneById from "./scripts/projectMain/getOneById.script"
import updateOne from "./scripts/projectMain/updateOne.script"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getCurrentSummary from "./scripts/projectMain/getCurrentSummary.script"

export default function makeBackendProjectMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    getCurrentSummary: getCurrentSummary(d),
    updateOne: updateOne(d),
  }
}
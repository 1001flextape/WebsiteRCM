import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/pageMain/addOne.script"
import getManyWithPagination from "./scripts/pageMain/getManyWithPagination.script"
import getOneById from "./scripts/pageMain/getOneById.script"
import getOneBySlug from "./scripts/pageMain/getOneBySlug.script"

export default function makeBackendProjectPageMain(d: dependencies) {
  return {
    addOne: addOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    getOneBySlug: getOneBySlug(d),
  }
}
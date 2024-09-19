import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import addMany from "./scripts/pageMain/addMany.script"
import addOne from "./scripts/pageMain/addOne.script"
import getManyByProjectId from "./scripts/pageMain/getManyByProjectId.script"
import getManyWithPagination from "./scripts/pageMain/getManyWithPagination.script"
import getOneById from "./scripts/pageMain/getOneById.script"
import getOneBySlug from "./scripts/pageMain/getOneBySlug.script"

export default function makeBackendProjectPageMain(d: dependencies) {
  return {
    addOne: addOne(d),
    addMany: addMany(d),
    getManyWithPagination: getManyWithPagination(d),
    getManyByProjectId: getManyByProjectId(d),
    getOneById: getOneById(d),
    getOneBySlug: getOneBySlug(d),
  }
}
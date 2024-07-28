import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/pageSql/addOne.script"
import getManyWithPagination from "./scripts/pageSql/getManyWithPagination.script"
import getManyByProjectId from "./scripts/pageSql/getManyByProjectId.script"
import getOneById from "./scripts/pageSql/getOneById.script"
import getOneBySlug from "./scripts/pageSql/getOneBySlug.script"

export default function makeBackendProjectPageSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getManyByProjectId: getManyByProjectId(d),
    getOneById: getOneById(d),
    getOneBySlug: getOneBySlug(d),
  }
}
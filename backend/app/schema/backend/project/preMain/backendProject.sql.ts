import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/projectSql/addOne.script"
import deleteOne from "./scripts/projectSql/deleteOne.script"
import getManyWithPagination from "./scripts/projectSql/getManyWithPagination.script"
import getMany from "./scripts/projectSql/getMany.script"
import getOneById from "./scripts/projectSql/getOneById.script"
import updateOne from "./scripts/projectSql/updateOne.script"
import getCurrentProject from "./scripts/projectSql/getCurrentProject.script"

export default function makeBackendProjectSql(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    getCurrentProject: getCurrentProject(d),
    updateOne: updateOne(d),
  }
}
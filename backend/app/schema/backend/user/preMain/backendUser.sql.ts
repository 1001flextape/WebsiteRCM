import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/userSql/addOne.script"
import deleteOne from "./scripts/userSql/deleteOne.script"
import getOneById from "./scripts/userSql/getOneById.script"
import updateOne from "./scripts/userSql/updateOne.script"
import getManyWithPagination from "./scripts/userSql/getManyWithPagination.script"

export default function makeBackendUserSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getManyWithPagination: getManyWithPagination(d),
    deleteOne: deleteOne(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}

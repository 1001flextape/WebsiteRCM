import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import addMany from "./scripts/sql/addMany.script"
import addOne from "./scripts/sql/addOne.script"
import deleteOne from "./scripts/sql/deleteOne.script"
import getManyWithPagination from "./scripts/sql/getManyWithPagination.script"
import getMany from "./scripts/sql/getMany.script"
import getOneById from "./scripts/sql/getOneById.script"
import updateOne from "./scripts/sql/updateOne.script"
import getPermissionsByRoleId from "./scripts/sql/getPermissionsByRoleId.script"

export default function makeBackendRoleSql(d: dependencies) {

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    getPermissionsByRoleId: getPermissionsByRoleId(d),
    updateOne: updateOne(d),
  }
}


import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import addMany from "./scripts/backendRoleManyPermissionSql/addMany.script"
import addOne from "./scripts/backendRoleManyPermissionSql/addOne.script"
import deleteMany from "./scripts/backendRoleManyPermissionSql/deleteMany.script"
import deleteOne from "./scripts/backendRoleManyPermissionSql/deleteOne.script"
import getManyByRoleId from "./scripts/backendRoleManyPermissionSql/getManyByRoleId.script"
import setList from "./scripts/backendRoleManyPermissionSql/setList.script"

export default function makeBackendRoleManyPermissionSql(d: dependencies) {

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deleteMany: deleteMany(d),
    deleteOne: deleteOne(d),
    getManyByRoleId: getManyByRoleId(d),
    setList: setList(d),
  }
}
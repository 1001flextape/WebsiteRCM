import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/backendRoleManyPermissionMain/addOne.script"
import deleteOne from "./scripts/backendRoleManyPermissionMain/deleteOne.script"
import getManyByRoleId from "./scripts/backendRoleManyPermissionMain/getManyByRoleId.script"
import setList from "./scripts/backendRoleManyPermissionMain/setList.script"

export default function makeBackendRoleManyPermissionMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyByRoleId: getManyByRoleId(d),
    setList: setList(d),
  }
}

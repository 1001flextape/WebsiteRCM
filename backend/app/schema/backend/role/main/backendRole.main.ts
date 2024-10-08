import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendRoleValidation from "../preMain/backendRole.validation"
import addMany from "./scripts/main/addMany.script"
import addOne from "./scripts/main/addOne.script"
import deleteOne from "./scripts/main/deleteOne.script"
import getManyWithPagination from "./scripts/main/getManyWithPagination.script"
import getMany from "./scripts/main/getMany.script"
import getOneById from "./scripts/main/getOneById.script"
import getOneRealTime from "./scripts/main/getOneRealTime.script"
import updateOne from "./scripts/main/updateOne.script"
import updateOneFromUI from "./scripts/main/updateOneFromUI.script"
import getPermissionsByRoleId from "./scripts/main/getPermissionsByRoleId.script"
import getManyTwoList from "./scripts/main/getManyTwoList.script"

export default function makeBackendRoleMain(d: dependencies) {

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getMany: getMany(d),
    getManyTwoList: getManyTwoList(d),
    getOneById: getOneById(d),
    getOneRealTime: getOneRealTime(d),
    getPermissionsByRoleId: getPermissionsByRoleId(d),
    updateOne: updateOne(d),
    updateOneFromUI: updateOneFromUI(d),
  }
}

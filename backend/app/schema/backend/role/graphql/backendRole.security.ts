import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../shield/rules"

const backendPermissionSecurity = {
  Query: {
    backendRole_getOneById: isAuthenticated,
    backendRole_getManyWithPagination: isAuthenticated,
    backendRole_getOneRealTime: isAuthenticated,
    backendRole_getPermissionsByRoleId: isAuthenticated,
    backendRole_getMany: isAuthenticated,
    backendRole_getManyTwoList: isAuthenticated,
  },
  Mutation: {
    backendRole_addOne: isAuthenticated,
    backendRole_updateOne: isAuthenticated,
    backendRole_deleteOne: isAuthenticated,

    backendRoleManyPermission_addOne: isAuthenticated,
    backendRoleManyPermission_deleteOne: isAuthenticated,
    backendRoleManyPermission_setList: isAuthenticated,

    backendRole_updateOneFromUI: isAuthenticated,
  }
}

export default backendPermissionSecurity
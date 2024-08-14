import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../shield/rules"

const backendPermissionSecurity = {
  Query: {
    backendUser_getOneById: isPublic,
    backendUser_getOneRealTime: isAuthenticated,
    backendUser_getManyWithPagination: isPublic,

    backendUserBasicView_me: isPublic,
    backendUserBasicView_them: isPublic,

    backendUserManyPermission_getAll: isPublic,
    backendUserManyRole_getAll: isPublic,

    backendUserProfile_getOneById: isPublic,
  },
  Mutation: {
    backendUser_addOne: isPublic,
    backendUser_changeTemporaryPassword: isAuthenticated,
    backendUser_updateOne: isPublic,
    backendUser_deleteOne: isPublic,

    backendUserManyPermission_setList: isAuthenticated,
    backendUserManyRole_setList: isAuthenticated,

    backendUser_deactivateOne: isAuthenticated,
    backendUser_reactivateOne: isAuthenticated,
    backendUserProfile_updateOne: and(isAuthenticated, isAdmin),
  }
}

export default backendPermissionSecurity
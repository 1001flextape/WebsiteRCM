import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingColumnSecurity = {
  Query: {
    backendSettingColumn_getOne: isAuthenticated,
    // backendSettingColumn_getOneRealTime: and(isAuthenticated, isAdmin),
    // backendSettingColumn_getOneRealTime: isAuthenticated,
  },
  Mutation: {
    // backendSettingColumn_upsertOne: and(isAuthenticated, isAdmin),
    backendSettingColumn_upsertOne: isAuthenticated,
  }
}

export default backendSettingColumnSecurity
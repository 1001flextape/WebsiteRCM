import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingBackgroundColorSecurity = {
  Query: {
    backendSettingBackgroundColor_getOne: isAuthenticated,
    // backendSettingBackgroundColor_getOneRealTime: and(isAuthenticated, isAdmin),
    // backendSettingBackgroundColor_getOneRealTime: isAuthenticated,
  },
  Mutation: {
    // backendSettingBackgroundColor_upsertOne: and(isAuthenticated, isAdmin),
    backendSettingBackgroundColor_upsertOne: isAuthenticated,
  }
}

export default backendSettingBackgroundColorSecurity
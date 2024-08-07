import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendSettingFontSecurity = {
  Query: {
    backendSettingFont_getOne: isAuthenticated,
    backendSettingFont_getOneRealTime: isAuthenticated,
    // backendSettingFont_getOneRealTime: and(isAuthenticated, isAdmin),
    // backendSettingFont_getOneRealTime: isAuthenticated,
  },
  Mutation: {
    // backendSettingFont_upsertOne: and(isAuthenticated, isAdmin),
    backendSettingFont_upsertOne: isAuthenticated,
  }
}

export default backendSettingFontSecurity
import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../../shield/rules"

const backendSettingChurchSecurity = {
  Query: {
    backendSettingOrganization_getOneRealTime: isAuthenticated,
    backendSettingOrganization_getOne: isAuthenticated,
  },
  Mutation: {
    // backendSetting_email_updateOne: and(isAuthenticated, isAdmin),
    backendSettingOrganization_updateOne: isAuthenticated,
  }
}

export default backendSettingChurchSecurity
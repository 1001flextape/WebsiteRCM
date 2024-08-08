import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const backendSettingAllSecurity = {
  Query: {
    backendSettingAll_isSettingReady: isAuthenticated,
    backendSettingAll_isWebsiteSettingReady: isAuthenticated,
  },
}

export default backendSettingAllSecurity
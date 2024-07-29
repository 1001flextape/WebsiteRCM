import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../shield/rules"

export default {
  Query: {
    backendProjectBackgroundColor_getOneByProjectId: isAuthenticated,
    backendProjectColors_getOneByProjectId: isAuthenticated,
    backendProjectFont_getOneByProjectId: isAuthenticated,
    backendProjectFooter_getOneByProjectId: isAuthenticated,
    backendProjectHeader_getOneByProjectId: isAuthenticated,
    backendProjectLink_getOneByProjectId: isAuthenticated,
    backendProjectBrowser_getOneByProjectId: isAuthenticated,
  },
}
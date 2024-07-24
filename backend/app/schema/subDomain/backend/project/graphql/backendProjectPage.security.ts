import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../../shield/rules"

export default {
  Query: {
    backendProjectPage_getManyWithPagination: isAuthenticated,
    backendProjectPage_getOneById: isAuthenticated,
  
    // # browser
    backendProjectPageBrowser_getOneByPageId: isAuthenticated,

    // # link
    backendProjectPageLink_getOneByPageId: isAuthenticated,

    // # sections
    backendProjectPageSectionLoud_getOneByPageId: isAuthenticated,
    backendProjectPageSectionNormal_getManyByPageId: isAuthenticated,     

  },
}
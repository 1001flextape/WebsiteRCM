import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../../shield/rules"

export default {
  Mutation: {
    backendSiteDesignerPublish_publishSite: isAuthenticated,
  },
}
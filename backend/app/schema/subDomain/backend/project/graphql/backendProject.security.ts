import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../../shield/rules"

export default {
  Query: {
    // backendProject_getManyWithPagination: isAuthenticated,
  },
}
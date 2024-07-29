import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../shield/rules"

const backendAuthSecurity = {
  Query: {

  },
  Mutation: {
    backendAuth_signup: isPublic,
    backendAuth_signin: isPublic,
    backendAuth_devSignin: isPublic,
    backendAuth_forgotPassword: isPublic,
    backendAuth_isTokenValid: isPublic,
  }
}

export default backendAuthSecurity
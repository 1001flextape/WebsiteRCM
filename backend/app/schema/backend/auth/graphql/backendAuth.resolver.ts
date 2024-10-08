import graphqlError from "../../../utils/graphql/grarphql.errorhandler";
import makeBackendAuthMain from "../main/backendAuth.main";

const backend_authResolver = {
  Query: {
    backendAuth_doesAUserExist: async (parent, args, ctx) => {
      const main = makeBackendAuthMain(ctx.d)

      const response = await main.doesAUserExist()

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendAuth_signup: async (parent, args, ctx) => {
      const main = makeBackendAuthMain(ctx.d)

      const response = await main.signup({
        email: args.email,
        password: args.password,
        confirmPassword: args.confirmPassword,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendAuth_signin: async (parent, args, ctx) => {
      const main = makeBackendAuthMain(ctx.d)

      const response = await main.signin({
        email: args.email,
        password: args.password,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendAuth_forgotPassword: async (parent, args, ctx) => {
      const main = makeBackendAuthMain(ctx.d)

      const response = await main.forgotPassword({
        email: args.email,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendAuth_isTokenValid: async (parent, args, ctx) => {
      const main = makeBackendAuthMain(ctx.d)

      const response = await main.isTokenValid({
        token: args.token
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendAuth_changeTemporaryPassword: async (parent, args, ctx) => {
      const main = makeBackendAuthMain(ctx.d)

      const response = await main.changeTemporaryPassword({
        email: args.email,
        temporaryPassword: args.temporaryPassword,
        password: args.password,
        confirmPassword: args.confirmPassword,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
};

export default backend_authResolver
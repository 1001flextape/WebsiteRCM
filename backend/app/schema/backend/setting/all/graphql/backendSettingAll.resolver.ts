import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSettingAllMain from "../main/backendSettingAll.main";

const backendSettingAllGqlResolver = {
  Query: {
    backendSettingAll_isSettingReady: async (parent, args, ctx) => {

      const main = makeBackendSettingAllMain(ctx.d)

      const response = await main.isSettingReady()

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendSettingAll_isWebsiteSettingReady: async (parent, args, ctx) => {

      const main = makeBackendSettingAllMain(ctx.d)

      const response = await main.isWebsiteSettingReady()

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
  },
}

export default backendSettingAllGqlResolver;
import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSettingLinkMain from "../main/backendSettingLink.main";

const backendSettingLinkGqlResolver = {
  Query: {
    backendSettingLink_getOneRealTime: async (parent, args, ctx) => {

      const main = makeBackendSettingLinkMain(ctx.d)

      const response = await main.getOneRealTime({
        socketId: args.socketId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSettingLink_getOne: async (parent, args, ctx) => {

      const main = makeBackendSettingLinkMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSettingLink_upsertOne: async (parent, args, ctx) => {

      const main = makeBackendSettingLinkMain(ctx.d)

      const response = await main.upsertOne({
        title: args.title,
        description: args.description,
        image: args.image,
        isReady: args.isReady,
        isChanged: true,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },

  },
}

export default backendSettingLinkGqlResolver;
import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSettingSiteMain from "../main/backendSettingSite.main";


const backendSettingSiteGqlResolver = {
  Query: {
    backendSettingSite_getOne: async (parent, args, ctx) => {

      const main = makeBackendSettingSiteMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendSettingSite_getOneRealTime: async (parent, args, ctx) => {

      const main = makeBackendSettingSiteMain(ctx.d)

      const response = await main.getOneRealTime({
        socketId: args.socketId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSettingSite_upsertOne: async (parent, args, ctx) => {

      const main = makeBackendSettingSiteMain(ctx.d)

      const response = await main.upsertOne({
        favicon: args.favicon,
        tab: args.tab,
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

export default backendSettingSiteGqlResolver

import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSettingColumnMain from "../main/backendSettingColumn.main";

const backendSettingColumnGqlResolver = {
  Query: {
    // backendSettingColumn_getOneRealTime: async (parent, args, ctx) => {

    //   const main = makeBackendSettingColumnMain(ctx.d)

    //   const response = await main.getOneRealTime({
    //     socketId: args.socketId,
    //   })

    //   if (response?.success) {
    //     return response.data

    //   } else {
    //     return graphqlError(response)
    //   }
    // },
    backendSettingColumn_getOne: async (parent, args, ctx) => {

      const main = makeBackendSettingColumnMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSettingColumn_upsertOne: async (parent, args, ctx) => {

      const main = makeBackendSettingColumnMain(ctx.d)

      const response = await main.upsertOne({
        width: args.width,
        isReady: args.isReady,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },

  },
}

export default backendSettingColumnGqlResolver;
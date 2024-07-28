import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSettingBackgroundColorMain from "../main/backendSettingBackgroundColor.main";

const backendSettingBackgroundColorGqlResolver = {
  Query: {
    // backendSettingBackgroundColor_getOneRealTime: async (parent, args, ctx) => {

    //   const main = makeBackendSettingBackgroundColorMain(ctx.d)

    //   const response = await main.getOneRealTime({
    //     socketId: args.socketId,
    //   })

    //   if (response?.success) {
    //     return response.data

    //   } else {
    //     return graphqlError(response)
    //   }
    // },
    backendSettingBackgroundColor_getOne: async (parent, args, ctx) => {

      const main = makeBackendSettingBackgroundColorMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSettingBackgroundColor_upsertOne: async (parent, args, ctx) => {

      const main = makeBackendSettingBackgroundColorMain(ctx.d)

      const response = await main.upsertOne({
        backgroundColor_day: args.backgroundColor_day,
        backgroundColor_night: args.backgroundColor_night,
        isChanged: true,
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

export default backendSettingBackgroundColorGqlResolver;
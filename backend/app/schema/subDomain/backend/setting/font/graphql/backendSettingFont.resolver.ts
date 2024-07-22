import graphqlError from "../../../../../utils/graphql/grarphql.errorhandler";
import makeBackendSettingFontMain from "../main/backendSettingFont.main";

const backendSettingFontGqlResolver = {
  Query: {
    // backendSettingFont_getOneRealTime: async (parent, args, ctx) => {

    //   const main = makeBackendSettingFontMain(ctx.d)

    //   const response = await main.getOneRealTime({
    //     socketId: args.socketId,
    //   })

    //   if (response?.success) {
    //     return response.data

    //   } else {
    //     return graphqlError(response)
    //   }
    // },
    backendSettingFont_getOne: async (parent, args, ctx) => {

      const main = makeBackendSettingFontMain(ctx.d)

      const response = await main.getOne()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSettingFont_upsertOne: async (parent, args, ctx) => {

      const main = makeBackendSettingFontMain(ctx.d)

      const response = await main.upsertOne({
        id: args.id,
        font: args.font,
        varient: args.varient,
        isChanged: args.isChanged,
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

export default backendSettingFontGqlResolver;
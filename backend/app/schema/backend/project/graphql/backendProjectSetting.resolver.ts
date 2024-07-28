import graphqlError from "../../../utils/graphql/grarphql.errorhandler";
import makebackendProjectMain from "../main/backendProject.main";
import makeBackendProjectBackgroundColorMain from "../main/backendProjectBackgroundColor.main";
import makeBackendProjectBrowserMain from "../main/backendProjectBrowser.main";
import makeBackendProjectColorsMain from "../main/backendProjectColors.main";
import makeBackendProjectFontMain from "../main/backendProjectFont.main";
import makeBackendProjectFooterMain from "../main/backendProjectFooter.main";
import makeBackendProjectHeaderMain from "../main/backendProjectHeader.main";
import makeBackendProjectLinkMain from "../main/backendProjectLink.main";

const backendProjectResolver = {
  Query: {
    backendProjectBackgroundColor_getOneByProjectId: async (parent, args, ctx) => {
      const main = makeBackendProjectBackgroundColorMain(ctx.d)

      const response = await main.getOneByProjectId({
        projectId: args.projectId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectColors_getOneByProjectId: async (parent, args, ctx) => {
      const main = makeBackendProjectColorsMain(ctx.d)

      const response = await main.getOneByProjectId({
        projectId: args.projectId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectFont_getOneByProjectId: async (parent, args, ctx) => {
      const main = makeBackendProjectFontMain(ctx.d)

      const response = await main.getOneByProjectId({
        projectId: args.projectId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectFooter_getOneByProjectId: async (parent, args, ctx) => {
      const main = makeBackendProjectFooterMain(ctx.d)

      const response = await main.getOneByProjectId({
        projectId: args.projectId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectHeader_getOneByProjectId: async (parent, args, ctx) => {
      const main = makeBackendProjectHeaderMain(ctx.d)

      const response = await main.getOneByProjectId({
        projectId: args.projectId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectLink_getOneByProjectId: async (parent, args, ctx) => {
      const main = makeBackendProjectLinkMain(ctx.d)

      const response = await main.getOneByProjectId({
        projectId: args.projectId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectBrowser_getOneByProjectId: async (parent, args, ctx) => {
      const main = makeBackendProjectBrowserMain(ctx.d)

      const response = await main.getOneByProjectId({
        projectId: args.projectId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },

    





  },
};

export default backendProjectResolver;
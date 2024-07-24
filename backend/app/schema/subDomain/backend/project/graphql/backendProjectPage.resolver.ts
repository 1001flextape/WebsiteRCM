import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makebackendProjectMain from "../main/backendProject.main";
import makeBackendProjectPageMain from "../main/backendProjectPage.main";
import makeBackendProjectPageBrowserMain from "../main/backendProjectPageBrowser.main";
import makeBackendProjectPageLinkMain from "../main/backendProjectPageLink.main";
import makeBackendProjectPageSectionLoudMain from "../main/backendProjectPageSectionLoud.main";
import makeBackendProjectPageSectionNormalMain from "../main/backendProjectPageSectionNormal.main";

const backendProjectResolver = {
  Query: {
    backendProjectPage_getManyWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectPageMain(ctx.d)

      const response = await main.getManyWithPagination({
        projectId: args.projectId,
        page: args.page,
        pageSize: args.pageSize,
        q: args.q,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },    
    backendProjectPage_getOneById: async (parent, args, ctx) => {
      const main = makeBackendProjectPageMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectPageBrowser_getOneByPageId: async (parent, args, ctx) => {
      const main = makeBackendProjectPageBrowserMain(ctx.d)

      const response = await main.getOneByPageId({
        pageId: args.pageId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectPageLink_getOneByPageId: async (parent, args, ctx) => {
      const main = makeBackendProjectPageLinkMain(ctx.d)

      const response = await main.getOneByPageId({
        pageId: args.pageId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectPageSectionLoud_getOneByPageId: async (parent, args, ctx) => {
      const main = makeBackendProjectPageSectionLoudMain(ctx.d)

      const response = await main.getOneByPageId({
        pageId: args.pageId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectPageSectionNormal_getManyByPageId: async (parent, args, ctx) => {
      const main = makeBackendProjectPageSectionNormalMain(ctx.d)

      const response = await main.getManyByPageId({
        pageId: args.pageId,
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
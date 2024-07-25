import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makebackendProjectMain from "../main/backendProject.main";
import makeBackendProjectStatusListMain from "../main/backendProjectStatusLists.main";

const backendProjectResolver = {
  Query: {

    // ======================================
    // Current Project
    // --------------------------------------
    backendProject_getCurrentSummary: async (parent, args, ctx) => {
      const main = makebackendProjectMain(ctx.d)

      const response = await main.getCurrentSummary()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },


    // configuration
    backendProjectStatusLists_getConfigurationChanged: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getConfigurationChanged()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getConfigurationNotReady: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getConfigurationNotReady()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getConfigurationReady: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getConfigurationReady()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },


    // Draft 
    backendProjectStatusLists_getManyDraftedPagesDeletedWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyDraftedPagesDeletedWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getManyDraftedPagesNewWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyDraftedPagesNewWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getManyDraftedPagesTotalWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyDraftedPagesTotalWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },


    // New pages
    backendProjectStatusLists_getManyNewPagesDeletedWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyNewPagesDeletedWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getManyNewPagesNewWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyNewPagesNewWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getManyNewPagesNotReadyWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyNewPagesNotReadyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getManyNewPagesReadyWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyNewPagesReadyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getManyNewPagesTotalWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyNewPagesTotalWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },


    // #Published Pages
    backendProjectStatusLists_getManyPublishedPagesChangeWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyPublishedPagesChangeWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getManyPublishedPagesDeletedWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyPublishedPagesDeletedWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getManyPublishedPagesNotReadyWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyPublishedPagesNotReadyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getManyPublishedPagesReadyWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyPublishedPagesReadyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendProjectStatusLists_getManyPublishedPagesTotalWithPagination: async (parent, args, ctx) => {
      const main = makeBackendProjectStatusListMain(ctx.d)

      const response = await main.getManyPublishedPagesTotalWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },



    
    // ======================================
    // Historical Project
    // --------------------------------------


    // backendProject_getSummary: BackendProjectSummaryType
    // backendProjectStatusLists_getConfigurationChanged: [BackendProjectConfigurationType]
    // backendProjectStatusLists_getConfigurationNotReady: [BackendProjectConfigurationType]
    // backendProjectStatusLists_getConfigurationReady: [BackendProjectConfigurationType]
    // backendProjectStatusLists_getManyDraftedPagesDeletedWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyDraftedPagesNewWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyDraftedPagesTotalWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyNewPagesDeletedWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyNewPagesNewWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyNewPagesNotReadyWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyNewPagesReadyWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyNewPagesTotalWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyPublishedPagesChangeWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyPublishedPagesDeletedWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyPublishedPagesNotReadyWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyPublishedPagesReadyWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 
    // backendProjectStatusLists_getManyPublishedPagesTotalWithPagination(q: String, page: Int, pageSize: Int): [BackendSiteDesignerPagePaginationType] 

  },
};

export default backendProjectResolver;
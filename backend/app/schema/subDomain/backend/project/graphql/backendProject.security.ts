import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../../shield/rules"

export default {
  Query: {
    backendProject_getCurrentSummary: isPublic,
    backendProjectStatusLists_getConfigurationChanged: isPublic,
    backendProjectStatusLists_getConfigurationNotReady: isPublic,
    backendProjectStatusLists_getConfigurationReady: isPublic,
    backendProjectStatusLists_getManyDraftedPagesDeletedWithPagination: isPublic,
    backendProjectStatusLists_getManyDraftedPagesNewWithPagination: isPublic,
    backendProjectStatusLists_getManyDraftedPagesTotalWithPagination: isPublic,
    backendProjectStatusLists_getManyNewPagesDeletedWithPagination: isPublic,
    backendProjectStatusLists_getManyNewPagesNewWithPagination: isPublic,
    backendProjectStatusLists_getManyNewPagesNotReadyWithPagination: isPublic,
    backendProjectStatusLists_getManyNewPagesReadyWithPagination: isPublic,
    backendProjectStatusLists_getManyNewPagesTotalWithPagination: isPublic,
    backendProjectStatusLists_getManyPublishedPagesChangeWithPagination: isPublic,
    backendProjectStatusLists_getManyPublishedPagesDeletedWithPagination: isPublic,
    backendProjectStatusLists_getManyPublishedPagesNotReadyWithPagination: isPublic,
    backendProjectStatusLists_getManyPublishedPagesReadyWithPagination: isPublic,
    backendProjectStatusLists_getManyPublishedPagesTotalWithPagination: isPublic,
  },
}
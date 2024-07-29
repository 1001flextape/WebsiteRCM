import gql from "graphql-tag"
import { paginationType } from "../../../utils";

const backendProjectType = gql`

  type BackendProjectType {
    id: ID
    # numberOfPages: Int
    createdAt: String
  }

  #==============================
  # curent
  #------------------------------

  type BackendProjectSummaryType {
    id: ID
    name: String
    color: String
    startedAt: String

    # Configuration
    getConfigurationChangedCount: Int,
    getConfigurationNotReadyCount: Int,
    getConfigurationProgress: Int,
    
    # Draft Pages
    getDraftedPagesDeletedCount: Int,
    getDraftedPagesNewCount: Int,
    getDraftedPagesTotalCount: Int,

    # New Pages
    getNewPagesDeletedCount: Int,
    getNewPagesNewCount: Int,
    getNewPagesNotReadyCount: Int,
    getNewPagesProgress: Int,
    getNewPagesTotalCount: Int,

    # published Pages
    getPublishedPagesChangedCount: Int,
    getPublishedPagesDeletedCount: Int,
    getPublishedPagesNotReadyCount: Int,
    getPublishedPagesProgress: Int,
    getPublishedPagesTotalCount: Int,
  }
  
  
  type BackendProjectConfigurationType {
    name: String
    isReady: Boolean
  }


  #==============================
  # historical
  #------------------------------

  type BackendProjectHistoricalSummaryType {
    id: ID
    name: String
    startedAt: String
    endedAt: String

    newPagesTotalCount: Int

    publishedPagesTotalCount: Int
    publishedPagesNewCount: Int
    publishedPagesDeletedCount: Int
    
    configurationChangesCount: Int

    draftedPagesTotalCount: Int
    draftedPagesNewCount: Int
    draftedPagesDeletedCount: Int
  }


  ${paginationType("BackendProjectPaginationType", "BackendProjectType")}

  type Query {
    # current
    backendProject_getCurrentSummary: BackendProjectSummaryType
    backendProjectStatusLists_getConfigurationChanged: [BackendProjectConfigurationType]
    backendProjectStatusLists_getConfigurationNotReady: [BackendProjectConfigurationType]
    backendProjectStatusLists_getConfigurationReady: [BackendProjectConfigurationType]
    backendProjectStatusLists_getManyDraftedPagesDeletedWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyDraftedPagesNewWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyDraftedPagesTotalWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyNewPagesDeletedWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyNewPagesNewWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyNewPagesNotReadyWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyNewPagesReadyWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyNewPagesTotalWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyPublishedPagesChangeWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyPublishedPagesDeletedWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyPublishedPagesNotReadyWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyPublishedPagesReadyWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
    backendProjectStatusLists_getManyPublishedPagesTotalWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType 
  
  
  
  
  
    # BackendSiteDesignerPageType
    # backendProject_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendProjectPaginationType
    #backendProject_getCurrentProject:
  }
`;
export default backendProjectType;

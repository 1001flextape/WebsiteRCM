import gql from "graphql-tag"
import { paginationType } from "../../../../utils";

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

  # type Query {
    # current
    # backendProject_getConfigurationChanged: 
    # BackendSiteDesignerPageType
    # backendProject_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendProjectPaginationType
    #backendProject_getCurrentProject:
  # }
`;
export default backendProjectType;

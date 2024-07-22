import gql from "graphql-tag"
import { paginationType } from "../../../../utils";

const backendProjectType = gql`

  type BackendProjectType {
    id: ID
    numberOfPages: Int
    createdAt: String
  }

  type BackendProjectSummaryType {
    id: ID
    name: String
    startedAt: String

    newPagesTotalCount: Int
    newPagesReadyCount: Int
    newPagesNewCount: Int
    newPagesNotReadyCount: Int
    newPagesDeletedCount: Int

    publishedPagesTotalCount: Int
    publishedPagesReadyCount: Int
    publishedPagesNewCount: Int
    publishedPagesNotReadyCount: Int
    publishedPagesDeletedCount: Int
    
    configurationReadyCount: Int
    configurationChangesCount: Int
    configurationNotReadyCount: Int

    draftedPagesTotalCount: Int
    draftedPagesNewCount: Int
    draftedPagesDeletedCount: Int
  }
  
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
    backendProject_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendProjectPaginationType
    #backendProject_getCurrentProject:
  }
`;
export default backendProjectType;

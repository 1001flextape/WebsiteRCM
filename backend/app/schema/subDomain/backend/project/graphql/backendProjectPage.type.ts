import gql from "graphql-tag"
import { paginationType } from "../../../../utils";

const backendProjectType = gql`

  type BackendProjectPageType {
    id: ID
    slug: String
    name: String
  }

  ${paginationType("BackendProjectPagePaginationType", "BackendProjectPageType")}

  type BackendProjectPageBrowserType {
    tabName: String
    pageId: ID
  }

  type BackendProjectPageLinkType {
    pageId: ID
    title: String
    description: String
    picture: String
    pictureAlt: String
  }

  type BackendProjectPageSectionLoudType {
    name: String
    author: String
    webAssetImport: String
    menuJsonB: String
    userAnswersJsonB: String
    selectionType: SelectionTypeEnum
    selectionId: ID
    pageId: ID
  }

  type BackendProjectPageSectionNormalType {
    id: ID
    name: String
    author: String
    webAssetImport: String
    menuJsonB: String
    userAnswersJsonB: String
    selectionType: SelectionTypeEnum
    selectionId: ID
    pageId: ID
  }



  type Query {
    backendProjectPage_getManyWithPagination(projectId: ID, q: String, page: Int, pageSize: Int): BackendProjectPagePaginationType
    backendProjectPage_getOneById(id: ID!): BackendProjectPageType
  
    # browser
    backendProjectPageBrowser_getOneByPageId(pageId: ID!): BackendProjectPageBrowserType

    # link
    backendProjectPageLink_getOneByPageId(pageId: ID!): BackendProjectPageLinkType

    # sections
    backendProjectPageSectionLoud_getOneByPageId(pageId: ID!): BackendProjectPageSectionLoudType
    backendProjectPageSectionNormal_getManyByPageId(pageId: ID!): [BackendProjectPageSectionNormalType]     
  }
`;
export default backendProjectType;

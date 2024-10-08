import gql from "graphql-tag"
import { paginationType } from "../../../../utils";

const backendSiteDesignerPageType = gql`

  enum BackendSiteDesignerPageStatusEnum {
    NEW
    DRAFT
    PUBLISHED
  }

  type BackendSiteDesignerPageType {
    id: ID
    slug: String
    name: String
    status: BackendSiteDesignerPageStatusEnum
    isReady: Boolean
    isRecentlyCreated: Boolean
  }

  type BackendSiteDesignerPageRealTimeType {
    id: ID
    entity: String
    slug: String
    isReady: RealTimeSwitch
    isDraft: RealTimeSwitch
    isRecentlyCreated: Boolean
    status: BackendSiteDesignerPageStatusEnum
  }

  ${paginationType("BackendSiteDesignerPagePaginationType", "BackendSiteDesignerPageType")}
  
  # =====================================
  # Browser
  # =====================================

  type backendSiteDesignerPageBrowser {
    id: ID
    tabName: String
    pageId: ID
  }

  type backendSiteDesignerPageBrowserRealTime {
    id: ID
    tabName: RealTimeTextField
    pageId: ID
    entity: String
  }

  # =====================================
  # Link
  # =====================================

  type backendSiteDesignerPageLink {
    id: ID
    pageId: ID
    title: String
    description: String
    picture: String
    pictureAlt: String
  }

  type backendSiteDesignerPageLinkRealTime {
    entity: String
    id: ID
    pageId: ID
    title: RealTimeTextField
    description: RealTimeTextField
    picture: RealTimeMediaSelection
  }

  # =====================================
  # Sections
  # =====================================

  type BackendSiteDesignerPageSectionLoudType {
    id: ID
    name: String
    author: String
    webAssetImport: String
    menuJsonB: String
    userAnswersJsonB: String
    isReady: Boolean
    selectionType: SelectionTypeEnum
    selectionId: ID
    pageId: ID
  }

  type BackendSiteDesignerPageSectionLoudRealTimeType {
    id: ID
    entity: String
    name: String
    author: String
    webAssetImport: String
    menuJsonB: String
    userAnswersJsonB: String
    isReady: RealTimeSwitch
    selectionType: SelectionTypeEnum
    selectionId: ID
    pageId: ID
  }

  type BackendSiteDesignerPageSectionNormalType {
    id: ID
    name: String
    author: String
    webAssetImport: String
    menuJsonB: String
    userAnswersJsonB: String
    isReady: Boolean
    selectionType: SelectionTypeEnum
    selectionId: ID
    pageId: ID
  }

  type BackendSiteDesignerPageSectionNormalRealTimeType {
    id: ID
    entity: String
    name: String
    author: String
    webAssetImport: String
    menuJsonB: String
    userAnswersJsonB: String
    isReady: RealTimeSwitch
    selectionType: SelectionTypeEnum
    selectionId: ID
    pageId: ID
  }
  
  # =====================================
  # Built-in components
  # =====================================

  enum LoudSectionEnum {
    HOMEPAGE
    NORMALPAGE
  }

  enum PageSectionEnum {
    LIST
    IMAGE
    TEXT
    OTHER
  }
  
  type backendSiteDesignerPageSectionLoudBuiltIn {
    id: String,
    category: LoudSectionEnum,
    webAssetImport: String,
    menuJsonB: String,
    description: String,
    author: String,
    authorLink: String,
    name: String,
  }

  type backendSiteDesignerPageSectionNormalBuiltIn {
    id: String,
    category: PageSectionEnum,
    webAssetImport: String,
    menuJsonB: String,
    description: String,
    author: String,
    authorLink: String,
    name: String,
  }


  type Query {
    # page
    backendSiteDesignerPage_doesHomePageExist: ReturningSuccessObj
    backendSiteDesignerPage_getOneById(id: ID!): BackendSiteDesignerPageType
    backendSiteDesignerPage_getOneBySlug(slug: String!): BackendSiteDesignerPageType
    backendSiteDesignerPage_getOneRealTimeById(id: ID!, socketId: ID!): BackendSiteDesignerPageRealTimeType
    backendSiteDesignerPage_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendSiteDesignerPagePaginationType
  
    # browser
    backendSiteDesignerPageBrowser_getOneByPageId(pageId: ID!): backendSiteDesignerPageBrowser
    backendSiteDesignerPageBrowser_getOneRealTimeByPageId(pageId: ID!, socketId: ID!): backendSiteDesignerPageBrowserRealTime

    # link
    backendSiteDesignerPageLink_getOneByPageId(pageId: ID!): backendSiteDesignerPageLink
    backendSiteDesignerPageLink_getOneRealTimeByPageId(pageId: ID!, socketId: ID!): backendSiteDesignerPageLinkRealTime

    # sections
    backendSiteDesignerPageSectionLoud_getOneByPageId(pageId: ID!): BackendSiteDesignerPageSectionLoudType
    backendSiteDesignerPageSectionLoud_getOneRealTimeByPageId(pageId: ID!, socketId: ID!): BackendSiteDesignerPageSectionLoudRealTimeType
    
    backendSiteDesignerPageSectionNormal_getManyByPageId(pageId: ID!): [BackendSiteDesignerPageSectionNormalType]
    backendSiteDesignerPageSectionNormal_getOneById(id: ID!): BackendSiteDesignerPageSectionNormalType
    backendSiteDesignerPageSectionNormal_getOneRealTimeById(id: ID!, socketId: ID!): BackendSiteDesignerPageSectionNormalRealTimeType
    
    # built-in
    backendSiteDesignerPageSectionLoudBuiltIn_getMany:[backendSiteDesignerPageSectionLoudBuiltIn]
    backendSiteDesignerPageSectionNormalBuiltIn_getMany:[backendSiteDesignerPageSectionNormalBuiltIn]
  }

  type Mutation {
    # page
    backendSiteDesignerPage_addOne(slug: String!, name: String, isReady: Boolean): BackendSiteDesignerPageType
    backendSiteDesignerPage_updateOne(id: ID!, slug: String, isReady: Boolean): BackendSiteDesignerPageType
    backendSiteDesignerPage_updateOneFromUI(id: ID!, isReady: Boolean, isDraft: Boolean): GlobalSuccessType
    backendSiteDesignerPage_deleteOne(id: ID!): BackendSiteDesignerPageType

    # browser
    backendSiteDesignerPageBrowser_upsertOne(pageId: ID!, id: ID, tabName: String): GlobalSuccessType

    # link
    backendSiteDesignerPageLink_upsertOne(pageId: ID!, id: ID, title: String, description: String, picture: String, pictureAlt: String): GlobalSuccessType

    # section
    backendSiteDesignerPageSectionLoud_upsertOne(pageId: ID!, selectionType: SelectionTypeEnum, selectionId: ID, userAnswersJsonB: String, isReady: Boolean): BackendSiteDesignerPageSectionLoudType
    backendSiteDesignerPageSectionLoud_deleteOne(id: ID!): GlobalSuccessType

    backendSiteDesignerPageSectionNormal_addOne(pageId: ID!, selectionType: SelectionTypeEnum, selectionId: ID, orderNumber: Int, userAnswersJsonB: String, isReady: Boolean): BackendSiteDesignerPageSectionNormalType
    backendSiteDesignerPageSectionNormal_updateOne(id: ID!, name: String, selectionType: SelectionTypeEnum, selectionId: ID, orderNumber: Int, userAnswersJsonB: String, isReady: Boolean): BackendSiteDesignerPageSectionNormalType
    backendSiteDesignerPageSectionNormal_deleteOne(id: ID!): GlobalSuccessType
  }
`;
export default backendSiteDesignerPageType;

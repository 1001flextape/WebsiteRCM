import gql from "graphql-tag"

const backendSettingHeaderGraphQLType = gql`

  enum SelectionTypeEnum {
    BUILT_IN, 
    PLUGIN,
    MARKET
  }

  type BackendSettingHeaderRealTimeType {
    entity: String,
    webAssetImport: String,
    menuJsonB: String,
    userAnswersJsonB: String,
    selectionType: String,
    selectionId: String,
    isReady: RealTimeSwitch
  }
    
  type BackendSettingHeaderType {
    isReady: Boolean
  }


  type BackendSettingHeaderBuiltInType {
    id: String,
    webAssetImport: String,
    menuJsonB: String,
    description: String,
    author: String,
    authorLink: String,
    name: String,
  }

  type Query {
    backendSettingHeader_getOneRealTime(socketId: ID!): BackendSettingHeaderRealTimeType
    backendSettingHeader_getOne: BackendSettingHeaderType
    backendSettingHeaderBuiltIn_getMany:[BackendSettingHeaderBuiltInType]
  }
  type Mutation {
    backendSettingHeader_upsertOne(selectionType: SelectionTypeEnum!, selectionId: ID!, userAnswers: String, isReady: Boolean): GlobalSuccessType
    backendSettingHeader_selectHeader(id: ID!, type: SelectionTypeEnum!, socketId: ID!): BackendSettingHeaderRealTimeType
  }
`


// selectionType: {
//   type: sequelize.ENUM("BUILT_IN", "PLUGIN", "MARKET"),
// },

export default backendSettingHeaderGraphQLType
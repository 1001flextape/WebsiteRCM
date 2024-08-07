import gql from "graphql-tag"

const backendSettingFontGraphQLType = gql`


  type BackendSettingFontRealTimeType {
    entity: String,
    font: RealTimeSelect,
    isReady: RealTimeSwitch
  }

  type BackendSettingFontType {
    font: String,
    isChanged: Boolean,
    isReady: Boolean
  }

  type Query {
    backendSettingFont_getOne: BackendSettingFontType
    backendSettingFont_getOneRealTime(socketId: ID!): BackendSettingFontRealTimeType
  }
  type Mutation {
    backendSettingFont_upsertOne(font: String, isChanged: Boolean, isReady: Boolean): BackendSettingFontType
  }
`

export default backendSettingFontGraphQLType
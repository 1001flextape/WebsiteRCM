import gql from "graphql-tag"

const backendSettingBackgroundColorGraphQLType = gql`

  type BackendSettingBackgroundColorRealTimeType {
    id: String,
    entity: String,
    backgroundColor_day: RealTimeColorSelection,
    backgroundColor_night: RealTimeColorSelection,
    isReady: RealTimeSwitch
  }
  type BackendSettingBackgroundColorType {
    backgroundColor_day: String,
    backgroundColor_night: String,  
    isReady: Boolean
  }

  type Query {
    backendSettingBackgroundColor_getOne: BackendSettingBackgroundColorType
    backendSettingBackgroundColor_getOneRealTime(socketId: ID!): BackendSettingBackgroundColorRealTimeType
  }
  type Mutation {
    backendSettingBackgroundColor_upsertOne(backgroundColor_day: String, backgroundColor_night: String, isReady: Boolean): BackendSettingBackgroundColorType
  }
`

export default backendSettingBackgroundColorGraphQLType
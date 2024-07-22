import gql from "graphql-tag"

const backendSettingBackgroundColorGraphQLType = gql`

# type BackendSettingBackgroundColorRealTimeType {
#   id: String,
#   entity: String,
#   isReady: RealTimeSwitch
# }
  type BackendSettingBackgroundColorType {
    id: String,
    backgroundColor_day: String,
    backgroundColor_night: String,  
    isReady: Boolean
  }

  type Query {
    backendSettingBackgroundColor_getOne: BackendSettingBackgroundColorType
    # backendSettingBackgroundColor_getOneRealTime(socketId: String!): BackendSettingBackgroundColorRealTimeType
  }
  type Mutation {
    backendSettingBackgroundColor_upsertOne(id: ID!, backgroundColor_day: String, backgroundColor_night: String, isReady: Boolean): BackendSettingBackgroundColorType
  }
`

export default backendSettingBackgroundColorGraphQLType
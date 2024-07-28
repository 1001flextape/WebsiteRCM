import gql from "graphql-tag"

const backendSettingColumnGraphQLType = gql`

# type BackendSettingColumnRealTimeType {
#   id: String,
#   entity: String,
#   title: RealTimeTextField,
#   description: RealTimeTextField,
#   image: RealTimePictureSelection,
#   isReady: RealTimeSwitch
# }

  type BackendSettingColumnType {
    width: String,
    isReady: Boolean
  }

  type Query {
    backendSettingColumn_getOne: BackendSettingColumnType
    # backendSettingColumn_getOneRealTime(socketId: String!): BackendSettingColumnRealTimeType
  }
  type Mutation {
    backendSettingColumn_upsertOne(width: String, isReady: Boolean): BackendSettingColumnType
  }
`

export default backendSettingColumnGraphQLType
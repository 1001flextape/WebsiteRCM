import gql from "graphql-tag"

const backendSettingColumnGraphQLType = gql`

  type BackendSettingColumnRealTimeType {
    entity: String,
    width: RealTimeSelect,
    isReady: RealTimeSwitch
  }

  type BackendSettingColumnType {
    width: String,
    isReady: Boolean
  }

  type Query {
    backendSettingColumn_getOne: BackendSettingColumnType
    backendSettingColumn_getOneRealTime(socketId: ID!): BackendSettingColumnRealTimeType
  }
  type Mutation {
    backendSettingColumn_upsertOne(width: String, isReady: Boolean): BackendSettingColumnType
  }
`

export default backendSettingColumnGraphQLType
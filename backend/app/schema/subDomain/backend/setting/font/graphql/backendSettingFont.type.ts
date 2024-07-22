import gql from "graphql-tag"

const backendSettingFontGraphQLType = gql`

# type BackendSettingFontRealTimeType {
#   id: String,
#   entity: String,
#   title: RealTimeTextField,
#   description: RealTimeTextField,
#   image: RealTimePictureSelection,
#   isReady: RealTimeSwitch
# }

  type BackendSettingFontType {
    id: String,
    font: String,
    varient: String,
    isChanged: Boolean,
    isReady: Boolean
  }

  type Query {
    backendSettingFont_getOne: BackendSettingFontType
    # backendSettingFont_getOneRealTime(socketId: String!): BackendSettingFontRealTimeType
  }
  type Mutation {
    backendSettingFont_upsertOne(id: ID!, font: String, varient: String, isChanged: Boolean, isReady: Boolean): BackendSettingFontType
  }
`

export default backendSettingFontGraphQLType
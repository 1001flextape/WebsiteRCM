import gql from "graphql-tag"

const backendSettingAllGraphQLType = gql`


  type Query {
    backendSettingAll_isSettingReady: ReturningSuccessObj
    backendSettingAll_isWebsiteSettingReady: ReturningSuccessObj
  }
`

export default backendSettingAllGraphQLType
import gql from "graphql-tag"

const backendAuthGqlType = gql`

  type CookieType {
    cookie: String
  }

  type TokenType {
    token: String
  }

  type Mutation {
    backendAuth_signup(email: String!, password: String!, confirmPassword: String!): TokenType
    backendAuth_signin(email: String!, password: String!): TokenType
    backendAuth_devSignin(email: String!, password: String!): TokenType
    backendAuth_forgotPassword(email: String!) : ReturningSuccessObj
    backendAuth_isTokenValid(token: String!) : ReturningSuccessObj
  }
`


export default backendAuthGqlType;

import gql from "graphql-tag"
import { paginationType } from "../../../utils"

const userType = gql`



  ${paginationType("UserPaginationType", "UserType")}

  type UserType {
    # normal user stuff
    id: ID
    email: String
    isAdmin: Boolean
    isDeactivated: Boolean
    # Profile
    username: String
    firstName: String
    lastName: String
    birthday: String
    picture: String
    displayName: String
    callByType: String
    circleColor: String
    labelColor: String
    roleId: String
    roleName: String
  }
  
  input UserInput {
    id: ID
    username: String
    email: String
    profile: UserProfileInput
    permissionMany: [BackendPermissionInput]
    roleMany: [BackendRoleInput]
  }

  type UserProfileType {
    id: ID
    callByType: String
    circleColor: String
    firstName: String
    labelColor: String
    lastName: String
    picture: String
    username: String
    displayName: String
  }

  input UserProfileInput {
    id: ID
    callByType: String
    circleColor: String
    firstName: String
    labelColor: String
    lastName: String
    picture: String
    username: String
  }

  type UserAvatarChipType {
    username: String
    profile_picture: String
  }

  type UserManyPermissionType {
    userId: String!
    permissionId: String!
    id: String
  }

  input UserManyPermissionInput {
    userId: String!
    permissionId: String!
    id: String
  }

  type UserManyRoleType {
    userId: String!
    roleId: String!
    id: String
  }

  input UserManyRoleInput {
    userId: String!
    roleId: String!
    id: String
  }

  enum CallByTypeEnum {
    EMAIL,
    USERNAME,
    FIRST_NAME,
    LAST_NAME,
    FULL_NAME
  }
  


  type Query {
    backendUser_getOneById(id: ID!): UserType
    backendUser_getManyWithPagination(q: String, page: Int, pageSize: Int): UserPaginationType
    backendUserBasicView_me: UserDisplay
    backendUserBasicView_them(id: ID!): UserDisplay

    backendUserManyPermission_getAll(id: ID!) : [UserManyPermissionType]
    backendUserManyRole_getAll(id: ID!): [UserManyRoleType]

    backendUserProfile_getOneById(id: ID!): UserProfileType
  
  }
  type Mutation {
    backendUser_addOne(username: String!, email: String!, password: String!, isAdmin: Boolean): GlobalSuccessType
    backendUser_deleteOne(id: ID!) : GlobalSuccessType
    backendUser_updateOne(id: ID!, username: String!, email: String!, password: String!, isAdmin: Boolean): GlobalSuccessType

    backendUserManyPermission_setList(list: [UserManyPermissionInput]): GlobalSuccessType
    backendUserManyRole_setList(list: [UserManyRoleInput]): GlobalSuccessType

    backendUserProfile_deactivateOne(id: ID!): GlobalSuccessType
    backendUserProfile_reactivateOne(id: ID!): GlobalSuccessType
    backendUserProfile_updateOne(id: ID!, callByType: String, circleColor: String, firstName: String, labelColor: String, lastName: String, picture: String, username: String) : UserType
 }
`;
export default userType;
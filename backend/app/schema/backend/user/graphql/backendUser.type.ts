import gql from "graphql-tag"
import { paginationType } from "../../../utils"

const userType = gql`


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

  ${paginationType("UserPaginationType", "UserType")}

  type BackendUserType {
    id: ID
    email: String
    isAdmin: RealTimeSwitch
    isDeactivated: RealTimeSwitch
    temporaryPassword: String
  }
  
  type BackendUserRealTimeType {
    entity: String

    # user
    id: ID
    email: String
    isAdmin: RealTimeSwitch
    isDeactivated: RealTimeSwitch

    #userProfile
    callByType: String
    circleColor: String
    firstName: String
    labelColor: String
    lastName: String
    picture: String
    username: String
    displayName: String
    
    # role
    role: RealTimeSelect

    # permissions
    isDashboardRead: RealTimeSwitch
    isMediaManagerInboxOnly: RealTimeSwitch
    isMediaManagerRead: RealTimeSwitch
    isMediaManagerUpdate: RealTimeSwitch
    isMediaManagerDelete: RealTimeSwitch
    isSiteDesignerRead: RealTimeSwitch
    isSiteDesignerUpdate: RealTimeSwitch
    isSiteDesignerDelete: RealTimeSwitch
    isAdminRead: RealTimeSwitch
    isAdminUpdate: RealTimeSwitch
    isAdminDelete: RealTimeSwitch
    isUserManagementRead: RealTimeSwitch
    isUserManagementUpdate: RealTimeSwitch
    isUserManagementDelete: RealTimeSwitch
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
    backendUser_getOneRealTime(id: ID!, socketId: ID!): BackendUserRealTimeType
    backendUser_getManyWithPagination(q: String, page: Int, pageSize: Int): UserPaginationType
    backendUserBasicView_me: UserDisplay
    backendUserBasicView_them(id: ID!): UserDisplay

    backendUserManyPermission_getAll(id: ID!) : [UserManyPermissionType]
    backendUserManyRole_getAll(id: ID!): [UserManyRoleType]

    backendUserProfile_getOneById(id: ID!): UserProfileType
  
  }
  type Mutation {
    backendUser_addOne(email: String!, username: String, password: String, isAdmin: Boolean): BackendUserType
    backendUser_changeTemporaryPassword(id: ID!, password: String!, temporaryPassword: String!): GlobalSuccessType
    backendUser_deleteOne(id: ID!) : GlobalSuccessType
    backendUser_updateOne(id: ID!, username: String, email: String, password: String, isAdmin: Boolean): GlobalSuccessType

    backendUserManyPermission_setList(list: [UserManyPermissionInput]): GlobalSuccessType
    backendUserManyRole_setList(list: [UserManyRoleInput]): GlobalSuccessType

    backendUserProfile_deactivateOne(id: ID!): GlobalSuccessType
    backendUserProfile_reactivateOne(id: ID!): GlobalSuccessType
    backendUserProfile_updateOne(id: ID!, callByType: String, circleColor: String, firstName: String, labelColor: String, lastName: String, picture: String, username: String) : UserType
 }
`;
export default userType;
import gql from "graphql-tag"
import { paginationType } from "../../../../utils"

const backendPermissionGqlType = gql`
  ${paginationType("BackendRolePaginationType", "BackendRoleType")}

  type BackendRoleType {
    id: ID
    name: String
    permission_getAll(q: String, page: Int, pageSize: Int): [BackendPermissionType]
  }

  
  type BackendRoleRealTimeType {
    id: ID
    entity: String
    currentName: String
    name: RealTimeTextField
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

  input BackendRoleInput {
    id: ID
    name: String
  }

  input BackendRolePermissionInput {
    roleId: ID
    permission: ID
  }
  
  type Query {
    backendRole_getOneById(id: ID): BackendRoleType
    backendRole_getManyWithPagination(q: String, page: Int, pageSize: Int): BackendRolePaginationType
    backendRole_getOneRealTime(socketId: ID!, roleId: ID!): BackendRoleRealTimeType
  
  }
  
  type Mutation {
    backendRole_addOne(name: String!, permissions: [BackendPermissionInput]): BackendRoleType
    backendRole_updateOne(id: ID!, name: String!): BackendRoleType
    backendRole_deleteOne(id: ID!): BackendRoleType

    backendRoleManyPermission_addOne(roleId: ID!, permissionId: ID!) : BackendRoleType
    backendRoleManyPermission_deleteOne(roleId: ID!, permissionId: ID!) : GlobalSuccessType
    backendRoleManyPermission_setList(roleManyPermissionArray:[BackendRolePermissionInput]!): GlobalSuccessType

    # UI feature:
    backendRole_updateOneFromUI(
      id: ID!,
      name: String!,
      isDashboardRead: Boolean!, 
      isMediaManagerInboxOnly: Boolean!, 
      isMediaManagerRead: Boolean!, 
      isMediaManagerUpdate: Boolean!, 
      isMediaManagerDelete: Boolean!, 
      isSiteDesignerRead: Boolean!, 
      isSiteDesignerUpdate: Boolean!, 
      isSiteDesignerDelete: Boolean!, 
      isAdminRead: Boolean!, 
      isAdminUpdate: Boolean!, 
      isAdminDelete: Boolean!, 
      isUserManagementRead: Boolean!, 
      isUserManagementUpdate: Boolean!, 
      isUserManagementDelete: Boolean!, 
    ) : GlobalSuccessType
  }
`

export default backendPermissionGqlType

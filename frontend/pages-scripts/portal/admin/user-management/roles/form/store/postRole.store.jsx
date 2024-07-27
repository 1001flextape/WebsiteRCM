import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postRoleGraphQL = ({
  id,
  name,
  isDashboardRead,
  isMediaManagerInboxOnly,
  isMediaManagerRead,
  isMediaManagerUpdate,
  isMediaManagerDelete,
  isSiteDesignerRead,
  isSiteDesignerUpdate,
  isSiteDesignerDelete,
  isAdminRead,
  isAdminUpdate,
  isAdminDelete,
  isUserManagementRead,
  isUserManagementUpdate,
  isUserManagementDelete,
}) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
mutation(
  $id: ID!,
  $name: String!,
  $isDashboardRead: Boolean!,
  $isMediaManagerInboxOnly: Boolean!,
  $isMediaManagerRead: Boolean!,
  $isMediaManagerUpdate: Boolean!,
  $isMediaManagerDelete: Boolean!,
  $isSiteDesignerRead: Boolean!,
  $isSiteDesignerUpdate: Boolean!,
  $isSiteDesignerDelete: Boolean!,
  $isAdminRead: Boolean!,
  $isAdminUpdate: Boolean!,
  $isAdminDelete: Boolean!,
  $isUserManagementRead: Boolean!,
  $isUserManagementUpdate: Boolean!,
  $isUserManagementDelete: Boolean!
) {
  backendRole_updateOneFromUI(
    id: $id,
  	name: $name,
    isDashboardRead: $isDashboardRead,
    isMediaManagerInboxOnly: $isMediaManagerInboxOnly,
    isMediaManagerRead: $isMediaManagerRead,
    isMediaManagerUpdate: $isMediaManagerUpdate,
    isMediaManagerDelete: $isMediaManagerDelete,
    isSiteDesignerRead: $isSiteDesignerRead,
    isSiteDesignerUpdate: $isSiteDesignerUpdate,
    isSiteDesignerDelete: $isSiteDesignerDelete,
    isAdminRead: $isAdminRead,
    isAdminUpdate: $isAdminUpdate,
    isAdminDelete: $isAdminDelete,
    isUserManagementRead: $isUserManagementRead,
    isUserManagementUpdate: $isUserManagementUpdate,
    isUserManagementDelete: $isUserManagementDelete
  ) {
    success
  }
}

      `,
      variables: {
        id,
        name,
        isDashboardRead,
        isMediaManagerInboxOnly,
        isMediaManagerRead,
        isMediaManagerUpdate,
        isMediaManagerDelete,
        isSiteDesignerRead,
        isSiteDesignerUpdate,
        isSiteDesignerDelete,
        isAdminRead,
        isAdminUpdate,
        isAdminDelete,
        isUserManagementRead,
        isUserManagementUpdate,
        isUserManagementDelete,
      }
    })

    //clean up
    resolve(response?.data)
  })
}


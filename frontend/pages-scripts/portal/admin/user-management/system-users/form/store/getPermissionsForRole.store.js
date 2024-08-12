import { callApi } from "@/utils/graphql/backend-api"

export const getPermissionsForRoleGraphQL = ({ roleId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `

      query($roleId: ID!) {
        backendRole_getPermissionsByRoleId(roleId: $roleId) {
          id
          name
          isDefault
        }
      }
`,
      variables: { roleId }
    })

    //clean up
    resolve(response?.data)
  })
}


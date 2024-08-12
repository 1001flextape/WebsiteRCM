import { callApi } from "@/utils/graphql/backend-api"

// example:
// {
//   "userRole": [
//     {
//       "roleId": "asdf",
//       "userId": "asdf"
//     }
//   ],
//     "userPermissions": [
//       {
//         "userId": "userId",
//         "permissionId": "permissionId"
//       }
//     ]
// }

export const postUserIsCustomPermissionseGraphQL = ({ id, isAdmin = false, userRole, userPermissions }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation ($id: ID!, $isAdmin: Boolean!, $userRole: [UserManyRoleInput]!, $userPermissions: [UserManyPermissionInput]) {
  backendUser_updateOne(id: $id, isAdmin: $isAdmin) {
    success
  }
  backendUserManyRole_setList(list: $userRole) {
    success
  }
	backendUserManyPermission_setList(list: $userPermissions) {
    success
  }
}

`,
      variables: { id, isAdmin, userRole, userPermissions }
    })

    //clean up
    resolve(response?.data)
  })
}


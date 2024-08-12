import { callApi } from "@/utils/graphql/backend-api"


// Example of parameter "UserManyRoleInput":

//     "UserManyRoleInput": [
//       {
//         "roleId": "roleId",
//         "userId": "userId"
//       }
//     ]
export const postUserRoleGraphQL = ({ id, isAdmin = false, userRole }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation ($id: ID!, $isAdmin: Boolean, $userRole: [UserManyRoleInput]!) {
  backendUser_updateOne(id: $id, isAdmin: $isAdmin) {
    success
  }
  backendUserManyRole_setList(list: $userRole) {
    success
  }
}
`,
      variables: { id, isAdmin, userRole }
    })

    //clean up
    resolve(response?.data)
  })
}


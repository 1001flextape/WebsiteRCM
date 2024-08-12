import { callApi } from "@/utils/graphql/backend-api"

export const postUserIsAdminGraphQL = ({ id, isAdmin }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation($id: ID!, $isAdmin: Boolean) {
  backendUser_updateOne(id: $id, isAdmin: $isAdmin) {
    success
  }
}
`,
      variables: { id, isAdmin }
    })

    //clean up
    resolve(response?.data)
  })
}


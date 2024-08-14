import { callApi } from "@/utils/graphql/backend-api"

export const postReactivateUserGraphQL = ({ id }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `

mutation($id: ID!) {
  backendUser_reactivateOne(id: $id) {
    success
  }
}
`,
      variables: { id }
    })

    //clean up
    resolve(response?.data)
  })
}


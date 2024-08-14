import { callApi } from "@/utils/graphql/backend-api"

export const postDeactivateUserGraphQL = ({ id }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `

mutation($id: ID!) {
  backendUser_deactivateOne(id: $id) {
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


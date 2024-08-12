import { callApi } from "@/utils/graphql/backend-api"

export const postNewBackendUsersGraphQL = ({ email }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation($email: String!) {
  backendUser_addOne(email: $email) {
    id
  }
}
      `,
      variables: { email }
    })

    //clean up
    resolve(response?.data)
  })
}


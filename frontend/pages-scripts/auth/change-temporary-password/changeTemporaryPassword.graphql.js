import { callApi } from "@/utils/graphql/backend-api"

export const changeTemporaryPasswordGraphQL = ({ email, temporaryPassword, password, confirmPassword }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation ($email: String!, $temporaryPassword: String!, $password: String!, $confirmPassword: String!) {
  backendAuth_changeTemporaryPassword(email: $email, temporaryPassword: $temporaryPassword, password: $password, confirmPassword: $confirmPassword) {
    token
  }
}

      `,
      variables: { email, temporaryPassword, password, confirmPassword }
    })

    //clean up
    resolve(response?.data)
  })
}
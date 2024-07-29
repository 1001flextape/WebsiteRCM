import { callApi } from "@/utils/graphql/backend-api"

export const postMediaManagerRestoreFileGraphQL = ({ id }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($id: ID!) {
        backendMediaManagerFile_restoreTrashed(id: $id) {
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


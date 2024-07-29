import { callApi } from "@/utils/graphql/backend-api"

export const postMediaManagerRenameFileGraphQL = ({ id, name }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($id: ID!, $name: String!) {
        backendMediaManagerFile_rename(id: $id, name: $name) {
          id
          userFileName
        }
      }
      `,
      variables: { id, name }
    })

    //clean up
    resolve(response?.data)
  })
}


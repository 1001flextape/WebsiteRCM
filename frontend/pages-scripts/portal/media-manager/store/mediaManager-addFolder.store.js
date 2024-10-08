import { callApi } from "@/utils/graphql/backend-api"

export const postMediaManagerNewFolderGraphQL = ({ name, folderId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($name: String!, $folderId: ID) {
        backendMediaManagerFolder_addOne(name: $name, folderId: $folderId) {
          id
        }
      }
      `,
      variables: { name, folderId }
    })

    //clean up
    resolve(response?.data)
  })
}


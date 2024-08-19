import { callApi } from "@/utils/graphql/backend-api"

export const postMediaManagerFileChangeFolderGraphQL = ({ id, folderId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation($id: ID!, $folderId: ID) {
  backendMediaManagerFile_moveFolder(id: $id, folderId: $folderId) {
    id
  }
}
      `,
      variables: { id, folderId }
    })

    //clean up
    resolve(response?.data)
  })
}


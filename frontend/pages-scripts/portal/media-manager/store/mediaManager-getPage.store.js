import { callApi } from "@/utils/graphql/backend-api"

export const getMediaManagerPageGraphQL = ({ folderId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query($folderId: ID) {
        backendMediaManagerFile_getMany(folderId: $folderId) {
          id
          userFileName
        }
        backendMediaManagerFolder_getMany(folderId: $folderId) {
          id
          name
        }
      }
      `,
      variables: { folderId }
    })

    //clean up
    resolve(response?.data)
  })
}


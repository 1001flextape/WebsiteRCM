import { callApi } from "@/utils/graphql/backend-api"

export const getMediaManagerFileByIdGraphQL = ({ id }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query($id: ID!) {
        backendMediaManagerFile_getOneById(id: $id){
          id
          userFileName
          systemFileName
          url
          folderId
          createdAt
          deletedAt
          deletedBy
          uploadedBy
        }
      }
      `,
      variables: { id }
    })

    //clean up
    resolve(response?.data)
  })
}


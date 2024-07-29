import { callApi } from "@/utils/graphql/backend-api"

export const getMediaManagerTrashedPageGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query {
        backendMediaManagerFile_viewTrash {
          id
          userFileName
        }
      }
      `
    })

    //clean up
    resolve(response?.data)
  })
}


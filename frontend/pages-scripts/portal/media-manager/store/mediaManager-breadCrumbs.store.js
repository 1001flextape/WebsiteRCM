import { callApi } from "@/utils/graphql/backend-api"

export const getMediaManagerBreadCrumbsGraphQL = ({ folderId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query($folderId: ID!) {
        backendMediaManagerFolder_getBreadCrumb(folderId: $folderId) {
          id
          name
          order
        }
      }
      `,
      variables: { folderId }
    })

    //clean up
    resolve(response?.data)
  })
}


import { callApi } from "@/utils/graphql/backend-api"

export const deleteNormalSectionGraphQL = ({ id }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($id: ID!) {
        backendSiteDesignerPageSectionNormal_deleteOne(id: $id) {
          success
        }
      }
      `,
      variables: { id }
      // variables: { pageId, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}


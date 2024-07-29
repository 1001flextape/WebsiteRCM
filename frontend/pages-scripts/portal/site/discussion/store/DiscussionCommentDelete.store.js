import { callApi } from "@/utils/graphql/backend-api"

export const postSiteDesignerDiscussionComment_deleteOne_GraphQL = ({ id, }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($id: ID!) {
        backendSiteDesignerDiscussionComment_deleteOne(id: $id) {
          success
        }
      }
      `,
      variables: { id, }
    })

    //clean up
    resolve(response?.data)
  })
}


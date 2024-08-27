import { callApi } from "@/utils/graphql/backend-api"

export const postPageGraphQL = ({
  id,
  isReady,
  isDraft,
}) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation ($id: ID!, $isReady: Boolean, $isDraft: Boolean) {
  backendSiteDesignerPage_updateOneFromUI(id: $id, isReady: $isReady, isDraft: $isDraft) {
    success
  }
}
 
      `,
      variables: {
        id,
        isReady,
        isDraft,
      }
    })

    //clean up
    resolve(response?.data)
  })
}


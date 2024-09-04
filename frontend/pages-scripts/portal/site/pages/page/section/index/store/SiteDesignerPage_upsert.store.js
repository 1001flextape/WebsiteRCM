import { callApi } from "@/utils/graphql/backend-api"

export const postSiteDesignerPageSectionNormalGraphQL = ({
  id,
  userAnswersJsonB,
}) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation ($id: ID!, $userAnswersJsonB: String) {
  backendSiteDesignerPageSectionNormal_updateOne(id: $id, userAnswersJsonB: $userAnswersJsonB) {
    isReady
  }
}
     
      `,
      variables: {
        id,
        userAnswersJsonB,
      }
    })

    //clean up
    resolve(response?.data)
  })
}


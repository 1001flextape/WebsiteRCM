import { callApi } from "@/utils/graphql/backend-api"

export const postSiteDesignerPageSectionLoudGraphQL = ({
  pageId,
  userAnswersJsonB,
}) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation ($pageId: ID!, $userAnswersJsonB: String) {
  backendSiteDesignerPageSectionLoud_upsertOne(pageId: $pageId, userAnswersJsonB: $userAnswersJsonB) {
    isReady
  }
}
      `,
      variables: {
        pageId,
        userAnswersJsonB,
      }
    })

    //clean up
    resolve(response?.data)
  })
}


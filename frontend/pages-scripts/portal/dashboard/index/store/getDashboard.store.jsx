import { callApi } from "@/utils/graphql/backend-api"

export const getDashboardGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query {
  backendProject_getCurrentSummary {
    name
    color
    startedAt
    getConfigurationChangedCount
    getConfigurationNotReadyCount
    getConfigurationProgress
    getDraftedPagesDeletedCount
    getDraftedPagesNewCount
    getDraftedPagesTotalCount
    getNewPagesDeletedCount
    getNewPagesNewCount
    getNewPagesNotReadyCount
    getNewPagesProgress
    getNewPagesTotalCount
    getPublishedPagesChangedCount
    getPublishedPagesDeletedCount
    getPublishedPagesNotReadyCount
    getPublishedPagesProgress
    getPublishedPagesTotalCount
  }
}

      `,
    })

    //clean up
    resolve(response?.data)
  })
}


import { callApi } from "@/utils/graphql/backend-api"

export const postReleaseWebsiteGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation {
        backendSiteDesignerPublish_publishSite {
           success
        }
      }
      `
    })

    //clean up
    resolve(response?.data)
  })
}


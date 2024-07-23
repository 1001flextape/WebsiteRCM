import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postReleaseWebsiteGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
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


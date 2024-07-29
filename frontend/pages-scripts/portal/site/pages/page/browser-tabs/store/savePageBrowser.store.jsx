import { callApi } from "@/utils/graphql/backend-api"

export const savePageBrowserGraphQL = ({ id, pageId, tabName, }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($pageId: ID!, $id: ID, $tabName: String) {
        backendSiteDesignerPageBrowser_upsertOne(id:$id, pageId: $pageId, tabName: $tabName) {
          success
        }
      }
      `,
      variables: { id, pageId, tabName, }
    })

    //clean up
    resolve(response?.data)
  })
}


import { callApi } from "@/utils/graphql/backend-api"

export const getPagesGraphQL = ({ q, page, pageSize }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query($q: String, $page: Int, $pageSize: Int) {
        backendSiteDesignerPage_doesHomePageExist {
          result
        }
        backendSiteDesignerPage_getManyWithPagination(
          q: $q
          page: $page
          pageSize: $pageSize
        ) {
          count
          page
          pageSize
          pageCount
          rows {
            id
            slug
            isReady
          }
        }
      }
      
      `,
      variables: { q, page, pageSize }
    })

    //clean up
    resolve(response?.data)
  })
}


import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getDraftedPagesTotalGraphQL = ({ q, page, pageSize }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
query ($q: String, $page: Int, $pageSize: Int) {
  backendProjectStatusLists_getManyDraftedPagesTotalWithPagination(q: $q, page: $page, pageSize: $pageSize) {
    count
    page
    pageSize
    pageCount
    rows {
      id
      slug
      name
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


import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getRolesGraphQL = ({ q, page, pageSize }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
query($q: String, $page: Int, $pageSize: Int) {
  backendRole_getManyWithPagination(q: $q, page: $page, pageSize: $pageSize) {
    count
    page
    pageSize
    pageCount
    rows {
      id
      name
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


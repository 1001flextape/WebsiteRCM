import { callApi } from "@/utils/graphql/backend-api"

export const getBackendUsersGraphQL = ({ q, page, pageSize }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query ($q: String, $page: Int, $pageSize: Int) {
  backendUser_getManyWithPagination(q: $q, page: $page, pageSize: $pageSize) {
    count
    page
    pageSize
    pageCount
    rows {
      id
      email
      isAdmin
      isDeactivated
      username
      firstName
      lastName
      birthday
      picture
      displayName
      callByType
      circleColor
      labelColor
      roleId
      roleName
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


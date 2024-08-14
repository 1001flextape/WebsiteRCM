import { callApi } from "@/utils/graphql/backend-api"

export const doesAUserExistGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query{
  backendAuth_doesAUserExist {
    result
  }
}
      `,
    })

    //clean up
    resolve(response?.data)
  })
}
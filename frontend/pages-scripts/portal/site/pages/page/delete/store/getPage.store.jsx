import { callApi } from "@/utils/graphql/backend-api"

export const getPageGraphQL = ({ id }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query($id: ID!) {
        backendSiteDesignerPage_getOneById(id: $id) {
          slug
        }
      }
      
      
      `,
      variables: { id }
    })

    //clean up
    resolve(response?.data)
  })
}


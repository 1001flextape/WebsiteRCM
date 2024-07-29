import { callApi } from "@/utils/graphql/backend-api"

export const postNewPageGraphQL = ({ slug, }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($slug: String!) {
        backendSiteDesignerPage_addOne(slug: $slug) {
          id
        }
      }
      
      
      `,
      variables: { slug, }
    })

    //clean up
    resolve(response?.data)
  })
}


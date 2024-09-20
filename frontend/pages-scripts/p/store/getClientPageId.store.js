import { callApiMiddleware, callSubDomainApiMiddlewareWithToken } from "@/utils/graphql/backend-api.middleware"

export const getClientPageIdBySlugGraphQL = ({ slug }) => {
  return new Promise(async (resolve) => {

    const response = await callApiMiddleware({
      query: `
      query($slug: String!) {
        clientSitePage_getOneBySlug(slug: $slug) {
          id
          slug
        }
      }            
      `,
      variables: { slug },
      noAuth: true,
      // variables: { pageId, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}


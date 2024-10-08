import { callApi } from "@/utils/graphql/backend-api"

export const createNormalSectionGraphQL = ({ pageId, selectionType, selectionId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation(
        $pageId: ID!
        $selectionType: SelectionTypeEnum!
        $selectionId: ID!
      ) {
        backendSiteDesignerPageSectionNormal_addOne(
          pageId: $pageId
          selectionType: $selectionType
          selectionId: $selectionId
        ) {
          id
        }
      }
      `,
      variables: { pageId, selectionType, selectionId }
      // variables: { pageId, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}




import { callApi } from "@/utils/graphql/backend-api"

export const getSettingNormalSectionRealTimeGraphQL = ({ id, socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query($id: ID!, $socketId: ID!) {
        backendSiteDesignerPageSectionNormal_getOneRealTimeById(
          id: $id
          socketId: $socketId
        ) {
          entity
          name
          author
          webAssetImport
          userAnswersJsonB
        }
      }
      
      `,
      variables: { id, socketId }
    })

    //clean up
    resolve(response?.data)
  })
}


import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingHeaderRealTimeGraphQL = ({ socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query($socketId: ID!) {
        backendSettingHeader_getOneRealTime(socketId: $socketId) {
          id
          entity
          webAssetImport
          menuJsonB
          userAnswersJsonB
          selectionType
          selectionId
          isReady {
            order
            name
            booleanValue
            user {
              id
              displayName
              circleColor
              labelColor
              picture
            }
          }
        }
      }
      
      `,
      variables: { socketId }
    })

    //clean up
    resolve(response?.data)
  })
}


import { callApi } from "@/utils/graphql/backend-api"

export const getSettingColumnGraphQL = ({ socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query ($socketId: ID!) {
  backendSettingColumn_getOneRealTime(socketId: $socketId) {
    entity
    width {
      order
      name
      value
      user {
        id
        displayName
        circleColor
        labelColor
        picture
      }
    }
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


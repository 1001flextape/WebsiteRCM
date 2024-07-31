import { callApi } from "@/utils/graphql/backend-api"

export const getSettingBackgroundColorRealTimeGraphQL = ({ socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query ($socketId: ID!) {
backendSettingBackgroundColor_getOneRealTime(socketId: $socketId) {
    entity
    backgroundColor_day {
      order
      name
      color
      user {
        id
        email
        firstName
        lastName
        username
        picture
        callByType
        circleColor
        labelColor
        displayName
      }
    }
    backgroundColor_night {
      order
      name
      color
      user {
        id
        email
        firstName
        lastName
        username
        picture
        callByType
        circleColor
        labelColor
        displayName
      }
    }
    isReady {
      order
      name
      booleanValue
      user {
        id
        email
        firstName
        lastName
        username
        picture
        callByType
        circleColor
        labelColor
        displayName
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


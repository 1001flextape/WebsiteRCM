import { callApi } from "@/utils/graphql/backend-api"

export const getSettingSiteGraphQL = ({ socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query ($socketId: ID!) {
  backendSettingSite_getOneRealTime(socketId: $socketId) {
    id
    entity
    tab {
      order
      name
      textValue
      selections {
        order
        userId
        username
        userColor
        range {
          index
          length
        }
      }
      usersWhoChangedValue {
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
    favicon {
      order
      name
      selection
      currentSelection {
        id
        favicon
        user {
          displayName
          labelColor
          circleColor
          picture
        }
      }
      uploads {
        id
        favicon
        user {
          displayName
          labelColor
          circleColor
          picture
        }
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


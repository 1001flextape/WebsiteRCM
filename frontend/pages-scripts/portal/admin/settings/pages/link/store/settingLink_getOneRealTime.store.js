import { callApi } from "@/utils/graphql/backend-api"

export const getSettingLinkGraphQL = ({ socketId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query ($socketId: String!) {
  backendSettingLink_getOneRealTime(socketId: $socketId) {
    entity
    title {
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
    description {
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
    image {
      order
      name
      selection
      currentSelection {
        picture
        user {
          id
          picture
          circleColor
          labelColor
          displayName
        }
      }
      uploads {
        picture
        user {
          displayName
          labelColor
          circleColor
          id
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
        picture
        displayName
        circleColor
        labelColor
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


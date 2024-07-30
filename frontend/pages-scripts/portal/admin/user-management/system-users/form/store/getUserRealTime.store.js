import { callApi } from "@/utils/graphql/backend-api"

export const getUserRealTimeGraphQL = ({ socketId, id }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query ($id: ID!, $socketId: ID!) {
  backendRole_getMany{
    id
    name
  }
  backendUser_getOneRealTime(id: $id, socketId: $socketId) {
    id
    entity
    email
    callByType
    circleColor
    firstName
    labelColor
    lastName
    picture
    username
    displayName
    isAdmin {
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
    isDeactivated {
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
    isMediaManagerInboxOnly {
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
    isMediaManagerRead {
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
    isMediaManagerUpdate {
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
    isMediaManagerDelete {
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
    isSiteDesignerRead {
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
    isMediaManagerUpdate {
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
    isMediaManagerDelete {
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
    isSiteDesignerRead {
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
    isSiteDesignerUpdate {
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
    isSiteDesignerDelete {
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
    isAdminRead {
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
    isAdminUpdate {
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
    isAdminDelete {
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
    isUserManagementRead {
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
    isUserManagementUpdate {
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
    isUserManagementDelete {
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
      variables: { socketId, id }
    })

    //clean up
    resolve(response?.data)
  })
}


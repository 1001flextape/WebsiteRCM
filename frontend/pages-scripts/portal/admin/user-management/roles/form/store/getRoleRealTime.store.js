import { callApi } from "@/utils/graphql/backend-api"

export const getRoleRealTimeGraphQL = ({ socketId, roleId }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query ($roleId: ID!, $socketId: ID!) {
  backendRole_getOneRealTime(socketId: $socketId, roleId: $roleId) {
    id
    entity
    currentName
    name {
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
    isDashboardRead {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isMediaManagerInboxOnly {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isMediaManagerRead {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isMediaManagerUpdate {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isMediaManagerDelete {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isSiteDesignerRead {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isSiteDesignerUpdate {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isSiteDesignerDelete {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isAdminRead {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isAdminUpdate {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isAdminDelete {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isUserManagementRead {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isUserManagementUpdate {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
    isUserManagementDelete {
      order
      name
      booleanValue
      user {
        id
        displayName
        labelColor
        circleColor
      }
    }
  }
}
      `,
      variables: { socketId, roleId }
    })

    //clean up
    resolve(response?.data)
  })
}


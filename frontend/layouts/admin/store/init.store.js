import { callApi } from "@/utils/graphql/backend-api"

export const getAdminLayoutInitGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query {
        backendUserBasicView_me {
          id
          email
          firstName
          lastName
          username
          picture
          callByType
          circleColor
          labelColor
        }
        backendNotification_getFirstByCount {
          id
          message
          hasBeenSeen
          hasBeenClicked
          action
          createdAt
        }
        backendNotification_getUnseenNotificationCount

        backendSettingOrganization_getOne {
          logo
          shouldApplyToTopNavMenu
          name
        }
      }
      `,
    })

    //clean up
    resolve(response?.data)
  })
}


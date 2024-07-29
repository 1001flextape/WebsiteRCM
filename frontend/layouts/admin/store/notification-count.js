import { callApi } from "@/utils/graphql/backend-api"

export const getNotificationsCountGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      
      {
        backendNotification_getUnseenNotificationCount
      }
      `
    })

    //clean up
    resolve(response?.data)
  })
}


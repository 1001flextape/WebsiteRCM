import { callApi } from "@/utils/graphql/backend-api"

export const getTopNotificationsGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      
      {
        backendNotification_getFirstByCount {
          id
          message
          hasBeenSeen
          hasBeenClicked
          action
          createdAt
        }
      }
      `
    })

    //clean up
    resolve(response?.data)
  })
}


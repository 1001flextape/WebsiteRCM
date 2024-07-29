import { callApi } from "@/utils/graphql/backend-api"

export const setNotificationSeenGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation {
        backendNotification_hasBeenSeen {
          success
        }
      }
      `
    })

    //clean up
    resolve(response?.data)
  })
}



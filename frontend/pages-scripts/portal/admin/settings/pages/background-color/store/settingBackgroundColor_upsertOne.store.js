import { callApi } from "@/utils/graphql/backend-api"

export const postSettingBackgroundColorGraphQL = ({
  backgroundColor_day,
  backgroundColor_night,
  isReady,
}) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation ($backgroundColor_day: String, $backgroundColor_night: String, $isReady: Boolean) {
  backendSettingBackgroundColor_upsertOne(backgroundColor_day: $backgroundColor_day, backgroundColor_night: $backgroundColor_night, isReady: $isReady) {
    backgroundColor_day
  }
}

      `,
      variables: {
        backgroundColor_day,
        backgroundColor_night,
        isReady,
      }
    })

    //clean up
    resolve(response?.data)
  })
}


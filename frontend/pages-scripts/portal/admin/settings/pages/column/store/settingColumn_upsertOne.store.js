import { callApi } from "@/utils/graphql/backend-api"

export const postSettingColumnGraphQL = ({
  width,
  isReady,
}) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation($width: String!, $isReady: Boolean) {
  backendSettingColumn_upsertOne(width: $width, isReady: $isReady) {
    width
  }
}
      `,
      variables: {
        width,
        isReady,
      }
    })

    //clean up
    resolve(response?.data)
  })
}


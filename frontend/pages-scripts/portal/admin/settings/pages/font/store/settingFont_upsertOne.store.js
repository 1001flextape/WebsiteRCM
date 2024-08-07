import { callApi } from "@/utils/graphql/backend-api"

export const postSettingFontGraphQL = ({
  font,
  isReady,
}) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      
mutation ($font: String, $isReady: Boolean) {
  backendSettingFont_upsertOne(font: $font, isReady: $isReady) {
    font
  }
}
      
      `,
      variables: {
        font,
        isReady,
      }
    })

    //clean up
    resolve(response?.data)
  })
}


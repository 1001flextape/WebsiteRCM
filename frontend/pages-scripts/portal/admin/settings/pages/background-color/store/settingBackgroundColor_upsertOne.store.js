import { callApi } from "@/utils/graphql/backend-api"

export const postSettingBackgroundColorGraphQL = ({
  id,
  favicon,
  tab,
  isReady,
}) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($id: ID, $favicon: String, $tab: String, $isReady: Boolean) {
        backendSettingBackgroundColor_upsertOne(favicon: $favicon, tab: $tab, isReady: $isReady) {
          isReady
        }
      }
      `,
      variables: {
        id,
        favicon,
        tab,
        isReady,
      }
    })

    //clean up
    resolve(response?.data)
  })
}


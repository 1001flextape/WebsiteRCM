import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postSettingFontGraphQL = ({
  id,
  favicon,
  tab,
  isReady,
}) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($id: ID, $favicon: String, $tab: String, $isReady: Boolean) {
        backendSettingFont_upsertOne(id: $id, favicon: $favicon, tab: $tab, isReady: $isReady) {
          id
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


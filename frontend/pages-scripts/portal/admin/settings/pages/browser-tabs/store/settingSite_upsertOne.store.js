import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const postSettingSiteGraphQL = ({
  id,
  favicon,
  tab,
  isReady,
}) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($favicon: String, $tab: String, $isReady: Boolean) {
        backendSettingSite_upsertOne(favicon: $favicon, tab: $tab, isReady: $isReady) {
          favicon
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


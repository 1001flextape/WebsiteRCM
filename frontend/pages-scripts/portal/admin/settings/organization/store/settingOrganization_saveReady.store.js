import { callApi } from "@/utils/graphql/backend-api"

export const postSettingOrganizationReadyGraphQL = ({ isReady }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($isReady: Boolean) {
        backendSettingOrganization_updateOne(isReady: $isReady) {
          createdAt
        }
      }
      `,
      variables: { isReady }
    })

    //clean up
    resolve(response?.data)
  })
}


import { callApi } from "@/utils/graphql/backend-api"

export const getSettingTabIsReadyGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `

      query {
        backendSettingAll_isWebsiteSettingReady {
          result
        }
        backendSettingOrganization_getOne {
          isReady
        }
      }      
      `,
    })

    //clean up
    resolve(response?.data)
  })
}


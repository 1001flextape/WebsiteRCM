import { callApi } from "@/utils/graphql/backend-api"

export const getIsReadyBySettingGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `

      query {
        backendSettingColors_getOne {
          isReady
        }
        backendSettingBackgroundColor_getOne {
          isReady
        }
        backendSettingFont_getOne {
          isReady
        }
        backendSettingHeader_getOne {
          isReady
        }
        backendSettingFooter_getOne {
          isReady
        }
        backendSettingColumn_getOne {
          isReady
        }
        backendSettingLink_getOne {
          isReady
        }
        backendSettingSite_getOne {
          isReady
        }
      }
            
      `
    })

    //clean up
    resolve(response?.data)
  })
}


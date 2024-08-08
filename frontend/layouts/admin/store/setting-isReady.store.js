import { callApi } from "@/utils/graphql/backend-api"

export const getIsSettingReadyGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query {
  backendSettingAll_isSettingReady {
    result
  }
}
      `
    })

    //clean up
    resolve(response?.data)
  })
}


import { callApi } from "@/utils/graphql/backend-api"

export const getConfigurationReadyGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query {
  backendProjectStatusLists_getConfigurationReady {
		name
    isReady
  }
}

      
      `
    })

    //clean up
    resolve(response?.data)
  })
}


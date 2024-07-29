import { callApi } from "@/utils/graphql/backend-api"

export const getConfigurationNotReadyGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query {
  backendProjectStatusLists_getConfigurationNotReady {
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


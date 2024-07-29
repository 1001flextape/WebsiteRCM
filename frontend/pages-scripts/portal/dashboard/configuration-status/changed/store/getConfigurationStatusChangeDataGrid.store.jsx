import { callApi } from "@/utils/graphql/backend-api"

export const getConfigurationChangedGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query {
  backendProjectStatusLists_getConfigurationChanged {
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


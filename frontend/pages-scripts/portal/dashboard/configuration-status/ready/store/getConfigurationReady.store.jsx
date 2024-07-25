import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getConfigurationReadyGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
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


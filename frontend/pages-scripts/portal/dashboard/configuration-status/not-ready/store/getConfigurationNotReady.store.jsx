import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getConfigurationNotReadyGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
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


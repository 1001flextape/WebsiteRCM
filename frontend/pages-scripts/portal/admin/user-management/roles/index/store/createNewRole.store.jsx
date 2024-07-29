import { callApi } from "@/utils/graphql/backend-api"

export const createNewRoleGraphQL = ({ name }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
mutation($name: String!) {
  backendRole_addOne(name: $name) {
    id
    name
  }
}

      `,
      variables: { name }
    })

    //clean up
    resolve(response?.data)
  })
}


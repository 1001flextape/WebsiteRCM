import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const deleteRoleGraphQL = ({ id, }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
mutation($id: ID!) {
  backendRole_deleteOne(id: $id) {
    id
  }
}
      `,
      variables: {
        id,
      }
    })

    //clean up
    resolve(response?.data)
  })
}


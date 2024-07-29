import { callApi } from "@/utils/graphql/backend-api"

export const getSettingHeaderBuiltInGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query {
        backendSettingHeaderBuiltIn_getMany{
          id
          webAssetImport
          menuJsonB
          description
          author
          authorLink
          name
        }
      }
      `,
    })

    //clean up
    resolve(response?.data)
  })
}


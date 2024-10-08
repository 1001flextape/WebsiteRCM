import { callApi } from "@/utils/graphql/backend-api"

export const postSettingFooterGraphQL = ({
  id,
  selectionType,
  selectionId,
  userAnswers,
  isReady,
}) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation(
        $selectionType: SelectionTypeEnum!
        $selectionId: ID!
        $userAnswers: String
        $isReady: Boolean!
      ) {
        backendSettingFooter_upsertOne(
          selectionType: $selectionType
          selectionId: $selectionId
          userAnswers: $userAnswers
          isReady: $isReady
        ) {
          success
        }
      }
      
      `,
      variables: {
        id,
        selectionType,
        selectionId,
        userAnswers,
        isReady,
      }
    })

    //clean up
    resolve(response?.data)
  })
}


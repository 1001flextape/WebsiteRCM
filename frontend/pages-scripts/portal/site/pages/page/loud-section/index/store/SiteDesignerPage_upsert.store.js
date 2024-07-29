// import { callApi } from "@/utils/graphql/backend-api"

// export const postSettingHeaderGraphQL = ({
//   id,
//   selectionType,
//   selectionId,
//   userAnswers,
//   isReady,
// }) => {
//   return new Promise(async (resolve) => {

//     const response = await callApi({
//       query: `
//       mutation(
//         $id: ID!
//         $selectionType: SelectionTypeEnum!
//         $selectionId: ID!
//         $userAnswers: String
//         $isReady: Boolean!
//       ) {
//         backendSettingHeader_upsertOne(
//           id: $id
//           selectionType: $selectionType
//           selectionId: $selectionId
//           userAnswers: $userAnswers
//           isReady: $isReady
//         ) {
//           success
//         }
//       }
      
//       `,
//       variables: {
//         id,
//         selectionType,
//         selectionId,
//         userAnswers,
//         isReady,
//       }
//     })

//     //clean up
//     resolve(response?.data)
//   })
// }


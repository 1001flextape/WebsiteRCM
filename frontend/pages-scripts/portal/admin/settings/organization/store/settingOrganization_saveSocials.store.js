import { callApi } from "@/utils/graphql/backend-api"

export const postSettingOrganizationSocialsGraphQL = ({ socialX, socialReddit, socialYouTube, socialFacebook, socialLinkedIn, socialWhatsapp, socialInstagram, socialPinterest }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation(
        $socialX: String
        $socialReddit: String
        $socialYouTube: String
        $socialFacebook: String
        $socialLinkedIn: String
        $socialWhatsapp: String
        $socialInstagram: String
        $socialPinterest: String
      ) {
        backendSettingOrganization_updateOne(
          socialX: $socialX,
          socialReddit: $socialReddit,
          socialYouTube: $socialYouTube,
          socialFacebook: $socialFacebook,
          socialLinkedIn: $socialLinkedIn,
          socialWhatsapp: $socialWhatsapp,
          socialInstagram: $socialInstagram
          socialPinterest: $socialPinterest,
        ) {
          createdAt
        }
      }
      
      `,
      variables: { socialX, socialReddit, socialYouTube, socialFacebook, socialLinkedIn, socialWhatsapp, socialInstagram, socialPinterest }
    })

    //clean up
    resolve(response?.data)
  })
}


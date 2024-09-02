import { callApi } from "@/utils/graphql/backend-api"

export const getOrganizationForRcmComponentsGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
query {
  backendSettingOrganization_getOne {
    logo
    name
    addressLine1
    addressLine2
    cityLocality
    stateProvinceRegion
    postalCode
    socialFacebook
    socialX
    socialInstagram
    socialLinkedIn
    socialYouTube
    socialPinterest
    socialWhatsapp
    socialWhatsapp
    socialReddit
  }
}
      `,
    })

    //clean up
    resolve(response?.data)
  })
}


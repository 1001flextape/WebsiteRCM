import { callApi } from "@/utils/graphql/backend-api"

export const postSettingOrganizationAddressGraphQL = ({ addressLine1, addressLine2, cityLocality, stateProvinceRegion, postalCode }) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($addressLine1: String, $addressLine2: String, $cityLocality: String, $stateProvinceRegion: String, $postalCode: String) {
        backendSettingOrganization_updateOne(addressLine1:$addressLine1, addressLine2:$addressLine2, cityLocality: $cityLocality, stateProvinceRegion: $stateProvinceRegion, postalCode: $postalCode) {
          createdAt
        }
      }
      `,
      variables: { addressLine1, addressLine2, cityLocality, stateProvinceRegion, postalCode }
    })

    //clean up
    resolve(response?.data)
  })
}


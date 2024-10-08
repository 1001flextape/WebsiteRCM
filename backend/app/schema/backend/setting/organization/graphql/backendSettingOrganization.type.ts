import gql from "graphql-tag"

const applicationType = gql`

  type BackendOrganizationRealTimeType {
    id: String
    entity: String,
    logo: RealTimePictureSelection,
    name: RealTimeTextField,
    shouldApplyToTopNavMenu: RealTimeSwitch,
    addressLine1: RealTimeTextField,
    addressLine2: RealTimeTextField,
    cityLocality: RealTimeTextField,
    stateProvinceRegion: RealTimeTextField,
    postalCode: RealTimeTextField,
    socialFacebook: RealTimeTextField,
    socialX: RealTimeTextField,
    socialInstagram: RealTimeTextField,
    socialLinkedIn: RealTimeTextField,
    socialYouTube: RealTimeTextField,
    socialPinterest: RealTimeTextField,
    socialWhatsapp: RealTimeTextField,
    socialReddit: RealTimeTextField,
    isReady: RealTimeSwitch,
    createdAt: String,
  }

  type BackendSettingOrganizationType {
    logo: String,
    name: String,
    shouldApplyToTopNavMenu: Boolean,
    addressLine1: String,
    addressLine2: String,
    cityLocality: String,
    stateProvinceRegion: String,
    postalCode: String,
    socialFacebook: String,
    socialX: String,
    socialInstagram: String,
    socialLinkedIn: String,
    socialYouTube: String,
    socialPinterest: String,
    socialWhatsapp: String,
    socialReddit: String,
    createdAt: String,
    isReady: Boolean
  }

  type Query {
    backendSettingOrganization_getOneRealTime(socketId: String): BackendOrganizationRealTimeType
    backendSettingOrganization_getOne: BackendSettingOrganizationType
  }
  type Mutation {
    backendSettingOrganization_updateOne(logo: String, name: String, shouldApplyToTopNavMenu: Boolean, addressLine1: String addressLine2: String, cityLocality: String, stateProvinceRegion: String, postalCode: String, socialFacebook: String, socialX: String, socialInstagram: String, socialLinkedIn: String, socialYouTube: String, socialPinterest: String, socialWhatsapp: String, socialReddit: String, isReady: Boolean): BackendOrganizationRealTimeType
  }
`

export default applicationType

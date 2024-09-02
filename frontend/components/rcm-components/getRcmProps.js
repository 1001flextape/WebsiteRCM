import { getOrganizationForRcmComponentsGraphQL } from "./state/store/getOrganizationForRcmComponentsGraphQL.store";
import { navigate } from "./state/system/utils/navigate";

export function getRcmProps({ state, user = {} }) {
  let stateData = {
    // functional states
    isDisplayMode: true,
    isFunctionalMode: false,
    isDevMode: false,
    isProdMode: false,

    //night mode
    isDayNightModeEnable: false,
    isDayMode: true,
    isNightMode: false,

    // make link end points
    assetApiUrl: "http://localhost:8080", // serverUrl
  }

  let utils = {
    navigate,
  }

  if (state) {
    stateData = state;
  }

  let organization = {}
  getOrganizationForRcmComponentsGraphQL().then(response => {
    const organizationData = response.data.backendSettingOrganization_getOne;

    organization = organizationData;

  })

  return {
    data: {
      organization,
      user,
      system: {
        state: stateData,
        utils,
      }
    }
  }
}
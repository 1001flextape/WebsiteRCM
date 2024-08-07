import gql from "graphql-tag"
import { paginationType } from "../../../utils";

const backendProjectType = gql`
  type BackendProjectBackgroundColorType {
    backgroundColor_day: String,
    backgroundColor_night: String,  
  }
    
  type BackendProjectColorsType {    
    color1: String
    color1Light1: String
    color1Light2: String
    color1Light3: String
    color1Light4: String
    color1Dark1: String
    color1Dark2: String
    color1Dark3: String
    color1Dark4: String
    color2: String
    color2Light1: String
    color2Light2: String
    color2Light3: String
    color2Light4: String
    color2Dark1: String
    color2Dark2: String
    color2Dark3: String
    color2Dark4: String
    color3: String
    color3Light1: String
    color3Light2: String
    color3Light3: String
    color3Light4: String
    color3Dark1: String
    color3Dark2: String
    color3Dark3: String
    color3Dark4: String
    color4: String
    color4Light1: String
    color4Light2: String
    color4Light3: String
    color4Light4: String
    color4Dark1: String
    color4Dark2: String
    color4Dark3: String
    color4Dark4: String
    color5: String
    color5Light1: String
    color5Light2: String
    color5Light3: String
    color5Light4: String
    color5Dark1: String
    color5Dark2: String
    color5Dark3: String
    color5Dark4: String
    color6: String
    color6Light1: String
    color6Light2: String
    color6Light3: String
    color6Light4: String
    color6Dark1: String
    color6Dark2: String
    color6Dark3: String
    color6Dark4: String
    color7: String
    color7Light1: String
    color7Light2: String
    color7Light3: String
    color7Light4: String
    color7Dark1: String
    color7Dark2: String
    color7Dark3: String
    color7Dark4: String
  }
    
  type BackendProjectColumnType {
    width: String,
  }
  
  type BackendProjectFontType {
    font: String
  }
    
  type BackendProjectFooterType {
    webAssetImport: String,
    menuJsonB: String,
    userAnswersJsonB: String,
    selectionType: String,
    selectionId: String,
  }

  type BackendProjectHeaderType {
    webAssetImport: String,
    menuJsonB: String,
    userAnswersJsonB: String,
    selectionType: String,
    selectionId: String,
  }
    
  type BackendProjectLinkType {
    id: String,
    title: String,
    description: String,
    image: RealTimePictureSelection,
    isReady: RealTimeSwitch
  }

  type BackendProjectOrganizationType {
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
  }
    
  type BackendProjectBrowserType {
    favicon: String
    tab: String
  }
   

  type Query {
    backendProjectBackgroundColor_getOneByProjectId(projectId: String): BackendProjectBackgroundColorType
    backendProjectColors_getOneByProjectId(projectId: String): BackendProjectColorsType
    backendProjectFont_getOneByProjectId(projectId: String): BackendProjectFontType
    backendProjectFooter_getOneByProjectId(projectId: String): BackendProjectFooterType
    backendProjectHeader_getOneByProjectId(projectId: String): BackendProjectHeaderType
    backendProjectLink_getOneByProjectId(projectId: String): BackendProjectLinkType
    backendProjectBrowser_getOneByProjectId(projectId: String): BackendProjectBrowserType
  
  } 
`;
export default backendProjectType;

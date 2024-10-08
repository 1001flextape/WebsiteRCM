import gql from "graphql-tag"

const userType = gql`
  type GlobalSuccessType {
    success: Boolean
  }
  
  type ReturningSuccessObj {
    success: Boolean
    result: Boolean
  }

  enum SelectionTypeEnum {
    BUILT_IN, 
    PLUGIN,
    MARKET
  }
  
  type UserDisplay { 
    id: ID!
    email: String
    firstName: String 
    lastName: String 
    username: String 
    picture: String 
    callByType: CallByTypeEnum 
    circleColor: String 
    labelColor: String
    displayName: String
  }

  type quillRange {
    index: Int!
    length: Int!
  }

  type SelectionCursor {
    order: Int
    userId: String
    username: String
    userColor: String
    range: quillRange
  }

  # real time adapters
  type RealTimeTextField {
    order: Int,
    name: String,
    textValue: String,
    selections: [SelectionCursor]
    usersWhoChangedValue: [UserDisplay]
  }

  type RealTimeSwitch {
    order: Int,
    name: String,
    booleanValue: Boolean,
    user: UserDisplay
  }

  type RealTimeSelect {
    order: Int,
    name: String,
    value: String,
    user: UserDisplay
  }

  type RealTimeColorSelection {
    order: Int,
    name: String,
    color: String,
    user: UserDisplay
  }

  type RealTimeColorPicker {
    order: Int,
    name: String,
    color: String,
    user: UserDisplay
    colorLight1: String,
    colorLight2: String,
    colorLight3: String,
    colorLight4: String,
    colorDark1: String,
    colorDark2: String,
    colorDark3: String,
    colorDark4: String, 
  }

  type SelectionType {
    id: String
    picture: String
    user: UserDisplay
    createdAt: String
  }

  type RealTimePictureSelection {
    order: Int
    name: String
    selection: String
    currentSelection: SelectionType
    uploads: [SelectionType]
  }

  type FaviconSelectionType {
    id: String
    favicon: String
    user: UserDisplay
    createdAt: String
  }

  type MediaSelectionType {
    id: String
    media: String
    user: UserDisplay
  }

  type RealTimeFaviconSelection {
    order: Int
    name: String
    selection: String
    currentSelection: FaviconSelectionType
    uploads: [FaviconSelectionType]
  }

  type RealTimeMediaSelection {
    order: Int
    name: String
    selection: String
    currentSelection: MediaSelectionType
    uploads: [MediaSelectionType]
  }

`;
export default userType;
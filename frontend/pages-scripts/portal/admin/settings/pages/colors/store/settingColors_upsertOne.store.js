import { callApi } from "@/utils/graphql/backend-api"

export const postSettingColorsGraphQL = ({
  id,
  isReady,
  color1,
  color1Light1,
  color1Light2,
  color1Light3,
  color1Light4,
  color1Dark1,
  color1Dark2,
  color1Dark3,
  color1Dark4,
  color2,
  color2Light1,
  color2Light2,
  color2Light3,
  color2Light4,
  color2Dark1,
  color2Dark2,
  color2Dark3,
  color2Dark4,
  color3,
  color3Light1,
  color3Light2,
  color3Light3,
  color3Light4,
  color3Dark1,
  color3Dark2,
  color3Dark3,
  color3Dark4,
  color4,
  color4Light1,
  color4Light2,
  color4Light3,
  color4Light4,
  color4Dark1,
  color4Dark2,
  color4Dark3,
  color4Dark4,
  color5,
  color5Light1,
  color5Light2,
  color5Light3,
  color5Light4,
  color5Dark1,
  color5Dark2,
  color5Dark3,
  color5Dark4,
  color6,
  color6Light1,
  color6Light2,
  color6Light3,
  color6Light4,
  color6Dark1,
  color6Dark2,
  color6Dark3,
  color6Dark4,
  color7,
  color7Light1,
  color7Light2,
  color7Light3,
  color7Light4,
  color7Dark1,
  color7Dark2,
  color7Dark3,
  color7Dark4,
}) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation(
        $isReady: Boolean
        $color1: String
        $color1Light1: String
        $color1Light2: String
        $color1Light3: String
        $color1Light4: String
        $color1Dark1: String
        $color1Dark2: String
        $color1Dark3: String
        $color1Dark4: String
        $color2: String
        $color2Light1: String
        $color2Light2: String
        $color2Light3: String
        $color2Light4: String
        $color2Dark1: String
        $color2Dark2: String
        $color2Dark3: String
        $color2Dark4: String
        $color3: String
        $color3Light1: String
        $color3Light2: String
        $color3Light3: String
        $color3Light4: String
        $color3Dark1: String
        $color3Dark2: String
        $color3Dark3: String
        $color3Dark4: String
        $color4: String
        $color4Light1: String
        $color4Light2: String
        $color4Light3: String
        $color4Light4: String
        $color4Dark1: String
        $color4Dark2: String
        $color4Dark3: String
        $color4Dark4: String
        $color5: String
        $color5Light1: String
        $color5Light2: String
        $color5Light3: String
        $color5Light4: String
        $color5Dark1: String
        $color5Dark2: String
        $color5Dark3: String
        $color5Dark4: String
        $color6: String
        $color6Light1: String
        $color6Light2: String
        $color6Light3: String
        $color6Light4: String
        $color6Dark1: String
        $color6Dark2: String
        $color6Dark3: String
        $color6Dark4: String
        $color7: String
        $color7Light1: String
        $color7Light2: String
        $color7Light3: String
        $color7Light4: String
        $color7Dark1: String
        $color7Dark2: String
        $color7Dark3: String
        $color7Dark4: String
      ) {
        backendSettingColors_upsertOne(
          isReady: $isReady
          color1: $color1
          color1Light1: $color1Light1
          color1Light2: $color1Light2
          color1Light3: $color1Light3
          color1Light4: $color1Light4
          color1Dark1: $color1Dark1
          color1Dark2: $color1Dark2
          color1Dark3: $color1Dark3
          color1Dark4: $color1Dark4
          
          color2: $color2
          color2Light1: $color2Light1
          color2Light2: $color2Light2
          color2Light3: $color2Light3
          color2Light4: $color2Light4
          color2Dark1: $color2Dark1
          color2Dark2: $color2Dark2
          color2Dark3: $color2Dark3
          color2Dark4: $color2Dark4
          
          color3: $color3
          color3Light1: $color3Light1
          color3Light2: $color3Light2
          color3Light3: $color3Light3
          color3Light4: $color3Light4
          color3Dark1: $color3Dark1
          color3Dark2: $color3Dark2
          color3Dark3: $color3Dark3
          color3Dark4: $color3Dark4
          
          color4: $color4
          color4Light1: $color4Light1
          color4Light2: $color4Light2
          color4Light3: $color4Light3
          color4Light4: $color4Light4
          color4Dark1: $color4Dark1
          color4Dark2: $color4Dark2
          color4Dark3: $color4Dark3
          color4Dark4: $color4Dark4
          
          color5: $color5
          color5Light1: $color5Light1
          color5Light2: $color5Light2
          color5Light3: $color5Light3
          color5Light4: $color5Light4
          color5Dark1: $color5Dark1
          color5Dark2: $color5Dark2
          color5Dark3: $color5Dark3
          color5Dark4: $color5Dark4
          
          
          color6: $color6
          color6Light1: $color6Light1
          color6Light2: $color6Light2
          color6Light3: $color6Light3
          color6Light4: $color6Light4
          color6Dark1: $color6Dark1
          color6Dark2: $color6Dark2
          color6Dark3: $color6Dark3
          color6Dark4: $color6Dark4
          
          
          color7: $color7
          color7Light1: $color7Light1
          color7Light2: $color7Light2
          color7Light3: $color7Light3
          color7Light4: $color7Light4
          color7Dark1: $color7Dark1
          color7Dark2: $color7Dark2
          color7Dark3: $color7Dark3
          color7Dark4: $color7Dark4
        ) {
          isReady
        }
      }
      `,
      variables: {
        id,
        isReady,
        color1,
        color1Light1,
        color1Light2,
        color1Light3,
        color1Light4,
        color1Dark1,
        color1Dark2,
        color1Dark3,
        color1Dark4,
        color2,
        color2Light1,
        color2Light2,
        color2Light3,
        color2Light4,
        color2Dark1,
        color2Dark2,
        color2Dark3,
        color2Dark4,
        color3,
        color3Light1,
        color3Light2,
        color3Light3,
        color3Light4,
        color3Dark1,
        color3Dark2,
        color3Dark3,
        color3Dark4,
        color4,
        color4Light1,
        color4Light2,
        color4Light3,
        color4Light4,
        color4Dark1,
        color4Dark2,
        color4Dark3,
        color4Dark4,
        color5,
        color5Light1,
        color5Light2,
        color5Light3,
        color5Light4,
        color5Dark1,
        color5Dark2,
        color5Dark3,
        color5Dark4,
        color6,
        color6Light1,
        color6Light2,
        color6Light3,
        color6Light4,
        color6Dark1,
        color6Dark2,
        color6Dark3,
        color6Dark4,
        color7,
        color7Light1,
        color7Light2,
        color7Light3,
        color7Light4,
        color7Dark1,
        color7Dark2,
        color7Dark3,
        color7Dark4,
      }
    })

    //clean up
    resolve(response?.data)
  })
}


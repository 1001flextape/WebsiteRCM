import { callApi } from "@/utils/graphql/backend-api"

export const getMeetingByUrl = ({url}) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query($url: String!) {
        collaborateMeeting_getMeetingsForUrl(url: $url) {
          id
          name
        }
      }
      `,
      variables: {url}
    })

    //clean up
    resolve(response?.data)
  })
}


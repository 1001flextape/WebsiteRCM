// Library
import React, { useEffect, useState } from 'react'

// mine
import MainSiteLayout from '@/layouts/mainSiteLayout/layout';
import { getSocketId, initSocket } from '@/utils/realtime/socket';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { getSettingBackgroundColorRealTimeGraphQL } from '@/pages-scripts/portal/admin/settings/pages/background-color/store/settingBackgroundColor_getOneRealTime.store';

const PreviewHeaderPage = (props) => {
  const theme = useTheme()
  const router = useRouter()

  const [isDayMode, setIsDayMode] = useState(true)
  const [backgroundColor, setBackgroundColor] = useState(theme.palette.grey[200])
  const [backgroundColorDay, setBackgroundColorDay] = useState(theme.palette.grey[200])
  const [backgroundColorNight, setBackgroundColorNight] = useState(theme.palette.grey[200])

  const [isLoaded, setIsLoaded] = useState(false)
  const [entity, setEntity] = useState()

  const initData = (isDarkMode) => {

    getSettingBackgroundColorRealTimeGraphQL({
      socketId: getSocketId()
    }).then(response => {

      const data = response.data.backendSettingBackgroundColor_getOneRealTime

      console.log("New data!!!!!!!!!!!!!!!!", data)
      setEntity(data.entity)
      setBackgroundColorNight(data.backgroundColor_night.color || theme.palette.grey[800])
      setBackgroundColorDay(data.backgroundColor_day.color || theme.palette.grey[800])
      setIsLoaded(true)
      
      if (isDarkMode) {
        setBackgroundColor(data.backgroundColor_night.color)
      } else {
        setBackgroundColor(data.backgroundColor_day.color)
      }
    })
  }

  useEffect(() => {

    if (router.query.mode) {
      const { mode: modeQueryParam } = router.query;

      switch (modeQueryParam.toString()) {
        case "night":
          initData(true)
          setIsDayMode(false)
          break;
        case "day":
          initData(false)
          setIsDayMode(true)
          break;

        default:
          setBackgroundColor(backgroundColorDay || "#fff")
          break;
      }
    }
  }, [router.query]);

  useEffect(() => {
    const socket = initSocket()

    socket.on('server-setting-background-change-prop', data => {

      setBackgroundColor(data.color)

    })


    return () => {
      socket.off('server-setting-background-change-prop')

      socket.emit('server-samedoc-unsub-entity', { entity })
    }
  }, [])

  return (
    <>
      {isLoaded && (
        <div
          style={{
            backgroundColor: backgroundColor,
            minHeight: "100vh",
            width: "100vw",
          }}
        >
        </div>
      )}
    </>
  )

}

// export async function getServerSideProps(context) {
//   // Extract the cookie from the request headers
//   const cookies = parse(context.req.headers.cookie || '');

//   // Now `cookies` is an object containing key-value pairs of all cookies
//   const token = cookies.authToken;

//   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', getSocketId())

//   const response = await callSubDomainApiMiddlewareWithToken({
//     token,
//     query: `
//     query($socketId: ID) {
//       backendSettingHeader_getOneRealTime(socketId: $socketId) {
//         entity
//         webAssetImport
//         menuJsonB
//         userAnswersJsonB
//         isReady {
//           order
//           name
//           booleanValue
//           user {
//             id
//             displayName
//             circleColor
//             labelColor
//             picture
//           }
//         }
//       }
//     }
//     `,
//     variables: {
//       socketId: getSocketId(),
//     }
//   })

//   const data = response.data.backendSettingHeader_getOneRealTime

//   return {
//     props: {
//       webAssetImport: data.webAssetImport,
//       data: {
//         user: JSON.parse(data.userAnswersJsonB),
//         system: {
//           state: {
//             isDisplayMode: false,
//             isFunctionalMode: true,
//             // isDayMode: //added later
//             // isNightMode //added later 
//           },
//           // socials
//         }
//       }
//     },
//   };
// }


PreviewHeaderPage.getLayout = function getLayout(page) {
  return (
    <MainSiteLayout
      hasNoEntity
    >
      {page}
    </MainSiteLayout>
  )
}

export default PreviewHeaderPage
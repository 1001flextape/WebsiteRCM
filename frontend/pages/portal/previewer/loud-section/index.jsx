// Library
import React, { useEffect, useState } from 'react'
import { parse } from 'cookie';

// mine
import MainSiteLayout from '@/layouts/mainSiteLayout/layout';
import { getSocketId, initSocket } from '@/utils/realtime/socket';
import { getSettingHeaderRealTimeGraphQL } from '@/pages-scripts/portal/admin/settings/pages/header/store/settingHeader_getRealTime.store';
import DynamicComponent from '@/components/previews/DynamicComponent/DynamicComponent.component'
import { callApiMiddlewareWithToken, callSubDomainApiMiddlewareWithToken } from '@/utils/graphql/backend-api.middleware';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { getSettingLoudSectionRealTimeGraphQL } from '@/pages-scripts/portal/previewer/loudSection/store/settingHeader_getRealTime.store';
import { getRcmProps } from '@/components/rcm-components/getRcmProps';

const PreviewLoudSectionPage = (props) => {
  const theme = useTheme()
  const router = useRouter()

  const [isDayMode, setIsDayMode] = useState(true)
  const [backgroundColor, setBackgroundColor] = useState(theme.palette.grey[200])

  const [isLoaded, setIsLoaded] = useState(false)
  const [entity, setEntity] = useState()
  const [componentProps, setComponentProps] = useState({})
  const [webAssetImport, setWebAssetImport] = useState()

  const initData = (isDayModeVar) => {

    getSettingLoudSectionRealTimeGraphQL({
      pageId: router.query.pageId,
      socketId: getSocketId()
    }).then(response => {

      const data = response.data.backendSiteDesignerPageSectionLoud_getOneRealTimeByPageId

      const user = (JSON.parse(data.userAnswersJsonB))

      setComponentProps(getRcmProps({
        state: {
          // functional states
          isDisplayMode: false,
          isFunctionalMode: true,
          isDevMode: true,
          isProdMode: false,

          //night mode
          isDayNightModeEnable: true,
          isDayMode: isDayModeVar,
          isNightMode: !isDayModeVar,

          // make API
          assetApiUrl: "http://localhost:8080", // old term: serverUrl
        },
        user: user || {},
      }))

      setWebAssetImport(data.webAssetImport)
      setEntity(data.entity)
      setIsLoaded(true)
    })
  }
  useEffect(() => {

    if (router.query.mode) {
      const { mode: modeQueryParam } = router.query;

      switch (modeQueryParam.toString()) {
        case "night":
          setBackgroundColor(theme.palette.grey[800])
          setIsDayMode(false)
          initData(false)
          break;
        case "day":
          setBackgroundColor(theme.palette.grey[200])
          setIsDayMode(true)
          initData(true)
          break;

        default:
          setBackgroundColor(theme.palette.grey[800])
          setBackgroundColor(theme.palette.grey[800])
          break;
      }

    }



  }, [router.query]);

  useEffect(() => {
    const socket = initSocket()

    socket.on('page-loud-section-change-prop', data => {

      console.log('page-loud-section-change-prop', data)
      if (data.name !== undefined && data.value !== undefined) {
        setComponentProps(prevState => {
          const newState = { ...prevState }

          if (!newState.data.user[data.name]) {
            newState.data.user[data.name] = {}
          }
          newState.data.user[data.name].value = data.value

          return newState
        })
      }
    })

    // socket.on("samedoc-header-selection-change", data => {
    //   setIsLoaded(false)
    //   initData()
    // })

    return () => {
      // socket.off('setting-header-change-prop')

      // socket.emit('server-samedoc-unsub-entity', { entity })

      // socket.off("samedoc-header-selection-change")
    }
  }, [])



  return (
    <>
      {isLoaded && webAssetImport && (
        <div
          style={{
            backgroundColor: backgroundColor,
            minHeight: "390px",
          }}
        >
          {/* <h1>Dynamic Component Example</h1> */}

          <DynamicComponent
            // isBuiltIn
            // isPlugin
            // change DynamicComponent to WebAssetComponent
            // change filePath to import.
            filePath={webAssetImport}
            // filePath={"built-in/theme/category/name"}
            // filePath={"plugin/domain/theme/category/name"}
            props={componentProps}
          />
          {/* <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to My Tailwind CSS App</h1>
          <p className="text-gray-700">This is a simple layout using Tailwind CSS in a Next.js app.</p>
          </div>
        </div> */}

          {/* <DynamicComponent filePath={"../../../../components/_delete/MyComponent"} props={ComponentProps} /> */}
        </div>
      )}
    </>
  )

}

PreviewLoudSectionPage.getLayout = function getLayout(page) {
  return (
    <MainSiteLayout
      hasNoEntity
    >
      {page}
    </MainSiteLayout>
  )
}

export default PreviewLoudSectionPage
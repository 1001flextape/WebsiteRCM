// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { getSocketId, initSocket } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { enqueueSnackbar } from 'notistack';
import { getSettingFontGraphQL } from '../store/settingFont_getOneRealTime.store';
import fontListJson from "../store/fonts.json"
import { postSettingFontGraphQL } from '../store/settingFont_upsertOne.store';

export const SettingFontContext = React.createContext();

export function SettingFontProvider({ children }) {
  const { updateEntity, idChip } = useContext(AdminLayoutContext)

  const [isLoaded, setLoaded] = useState(false)

  const [modals, setModals] = useState({
    isSystemFaviconsModalOpened: false,
  })

  const [id, setId] = useState()
  const [entity, setEntity] = useState()

  const [fonts] = useState(fontListJson.menu)
  const [font, setFont] = useState()
  const [fontValue, setFontValue] = useState()
  const [isReady, setIsReady] = useState()
  const [isReadyValue, setIsReadyValue] = useState()
  // const scaledDownSize = selectedFontSize / scaleDownRatio;

  const [scaleDownRatio] = useState(5);

  const [scaledDownSize, setScaledDownSize] = useState(1000 / scaleDownRatio)

  useEffect(() => {
    const socketId = getSocketId()
    getSettingFontGraphQL({
      socketId,
    }).then(result => {
      const data = result.data.backendSettingFont_getOneRealTime
      console.log('init data for site', data)
      console.log('fonts json', fontListJson)
      if (data) {

        updateEntity({
          entity: data.entity
        })
        setEntity(data.entity)

        setIsReady(data.isReady)

        setFont(data.font)
      }

      setLoaded(true)
    })


  }, [])

  const save = () => {
    postSettingFontGraphQL({
      font: fontValue,
      isReady: isReadyValue,
    }).then(response => {
      enqueueSnackbar("Font Saved!")
    })
  }

  return (
    <SettingFontContext.Provider value={{
      isLoaded, setLoaded,
      id, setId,
      entity, setEntity,
      fonts,
      font, setFont,
      fontValue, setFontValue,
      isReady, setIsReady,
      isReadyValue, setIsReadyValue,
      modals, setModals,

      scaleDownRatio,
      scaledDownSize, setScaledDownSize,

      save,
    }}>
      <>
        {isLoaded && (
          <>
            {children}
          </>
        )}
      </>
    </SettingFontContext.Provider>
  )
}

export default SettingFontProvider
// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { getSocketId, initSocket } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { getSettingBackgroundColorRealTimeGraphQL } from '../store/settingBackgroundColor_getOneRealTime.store';
// import { getSettingBackgroundColorGraphQL } from '../store/settingBackgroundColor_getOneRealTime.store';
import { enqueueSnackbar } from 'notistack';
import { postSettingBackgroundColorGraphQL } from '../store/settingBackgroundColor_upsertOne.store';

export const SettingBackgroundColorContext = React.createContext();

export function SettingBackgroundColorProvider({ children }) {
  const { updateEntity, idChip } = useContext(AdminLayoutContext)

  const [isLoaded, setLoaded] = useState(false)

  const [modals, setModals] = useState({
    isSystemFaviconsModalOpened: false,
  })

  const [entity, setEntity] = useState()

  const [backgroundColorDay, setBackgroundColorDay] = useState()
  const [backgroundColorDayValue, setBackgroundColorDayValue] = useState()
  const [backgroundColorNight, setBackgroundColorNight] = useState()
  const [backgroundColorNightValue, setBackgroundColorNightValue] = useState()
  const [isReady, setIsReady] = useState()
  const [isReadyValue, setIsReadyValue] = useState()

  const [isDarkMode, setIsDarkMode] = useState(false)

  const save = () => {
    postSettingBackgroundColorGraphQL({
      backgroundColor_day: backgroundColorDayValue,
      backgroundColor_night: backgroundColorNightValue,
      isReady: isReadyValue,
    }).then(response => {
      enqueueSnackbar("Background Colors Saved!")
    })
  }

  useEffect(() => {

    getSettingBackgroundColorRealTimeGraphQL({
      socketId: getSocketId(),
    }).then(result => {
      const data = result.data.backendSettingBackgroundColor_getOneRealTime
      if (data) {

        updateEntity({
          entity: data.entity
        })
        setEntity(data.entity)

        setIsReady(data.isReady)

        setBackgroundColorNight(data.backgroundColor_night)
        
        setBackgroundColorDay(data.backgroundColor_day)

        console.log('backgroundColorDay',backgroundColorDay)

        setLoaded(true)

      } else {
        setLoaded(true)
      }
    })
  }, [])

  return (
    <SettingBackgroundColorContext.Provider value={{
      isLoaded, setLoaded,
      entity, setEntity,

      backgroundColorDay, setBackgroundColorDay,
      backgroundColorDayValue, setBackgroundColorDayValue,
      backgroundColorNight, setBackgroundColorNight,
      backgroundColorNightValue, setBackgroundColorNightValue,

      isReady, setIsReady,
      isReadyValue, setIsReadyValue,
      modals, setModals,
      isDarkMode, setIsDarkMode,

      save,
    }}>
      <>
        {isLoaded && (
          <>
            {children}
          </>
        )}
      </>
    </SettingBackgroundColorContext.Provider>
  )
}

export default SettingBackgroundColorProvider
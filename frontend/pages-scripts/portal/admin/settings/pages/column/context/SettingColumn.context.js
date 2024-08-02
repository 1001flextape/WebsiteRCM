// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { getSocketId, initSocket } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { getSettingColumnGraphQL } from '../store/settingColumn_getOneRealTime.store';
import { postSettingColumnGraphQL } from '../store/settingColumn_upsertOne.store';
import { enqueueSnackbar } from 'notistack';

export const SettingColumnContext = React.createContext();

export function SettingColumnProvider({ children }) {
  const { updateEntity, idChip } = useContext(AdminLayoutContext)

  const [isLoaded, setLoaded] = useState(false)

  const [modals, setModals] = useState({
    isSystemFaviconsModalOpened: false,
  })

  const [id, setId] = useState()
  const [entity, setEntity] = useState()

  const [width, setWidth] = useState()
  const [widthValue, setWidthValue] = useState()
  const [isReady, setIsReady] = useState()
  const [isReadyValue, setIsReadyValue] = useState()
  // const scaledDownSize = selectedColumnSize / scaleDownRatio;

  const [scaleDownRatio] = useState(5);

  const [scaledDownSize, setScaledDownSize] = useState(1000 / scaleDownRatio)

  useEffect(() => {
    const socketId = getSocketId()
    getSettingColumnGraphQL({
      socketId,
    }).then(result => {
      const data = result.data.backendSettingColumn_getOneRealTime
      console.log('init data for site', data)
      if (data) {

        updateEntity({
          entity: data.entity
        })
        setEntity(data.entity)

        setIsReady(data.isReady)

        setWidth(data.width)
      }

      setLoaded(true)
    })


  }, [])

  const save = () => {
    postSettingColumnGraphQL({
      width: widthValue,
      isReady: isReadyValue,
    }).then(response => {
      enqueueSnackbar("Column Saved!")
    })
  }

  return (
    <SettingColumnContext.Provider value={{
      isLoaded, setLoaded,
      id, setId,
      entity, setEntity,
      width, setWidth,
      widthValue, setWidthValue,
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
    </SettingColumnContext.Provider>
  )
}

export default SettingColumnProvider
// Libraries
import React, { useEffect, useState } from 'react'
import { getSettingTabIsReadyGraphQL } from './setting-tabs-isReady.store';

export const SettingTabsContext = React.createContext();

export function SettingTabsProvider({ children }) {

  const [tabs, setTabs] = useState({
    tabs: null,
    selectedValue: null,
  })

  const [isSettingWebsiteReady, setIsSettingWebsiteReady] = useState()
  const [isOrganizationReady, setIsOrganizationReady] = useState()

  useEffect(() => {
    getSettingTabIsReadyGraphQL().then(response => {
      const data = response.data;

      setIsSettingWebsiteReady(data.backendSettingAll_isWebsiteSettingReady.result)
      setIsOrganizationReady(data.backendSettingOrganization_getOne.isReady)
    })

  }, [])


  return (
    <SettingTabsContext.Provider value={{
      tabs, setTabs,
      isSettingWebsiteReady, setIsSettingWebsiteReady,
      isOrganizationReady, setIsOrganizationReady,
    }}>
      {children}
    </SettingTabsContext.Provider>
  )
}

export default SettingTabsContext
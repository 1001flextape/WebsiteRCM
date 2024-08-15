import React, { useContext, useEffect } from 'react'
import AdminLayoutContext from '../layout/adminLayout.context'
import { initSocket } from '@/utils/realtime/socket';

function CompanyBrandingSockets({ children }) {
  const {
    setNotifications, notifications,
    setLeftDrawer,
  } = useContext(AdminLayoutContext)

  useEffect(() => {

    const socket = initSocket()

    socket.on('server-change-company-branding', async data => {
      //   const newNoti = await getTopNotificationsGraphQL();
      //   const listOfNewNotification = newNoti.data.backendNotification_getFirstByCount

      console.log('server-change-company-branding', data)
      setLeftDrawer(prevState => ({
        ...prevState,
        logo: data.logo,
        shouldApplyToTopNavMenu: data.shouldApplyToTopNavMenu,
        name: data.name,
      }))
    })

    return () => {
      socket.off('server-change-company-branding')
    }

  }, [setNotifications, notifications]);

  return (
    <div>
      {children}
    </div>
  )
}

export default CompanyBrandingSockets
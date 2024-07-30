'use client'

//library
import React, { useContext, useEffect, useState } from 'react'

// Mine
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import UserManagementTabsContext, { UserManagementTabsProvider } from '@/pages-scripts/portal/admin/user-management/tabs/UserManagementTabs.context';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import userManagementTabsJson from '@/pages-scripts/portal/admin/user-management/tabs/tabs.json';

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import UserManagementTabs from '@/pages-scripts/portal/admin/user-management/tabs/tabs';
import SystemUserDataGrid from '@/pages-scripts/portal/admin/user-management/system-users/index/components/SystemUserDataGrid';
import UsersProvider, { UsersContext } from '@/pages-scripts/portal/admin/user-management/system-users/index/context/SystemUsers.context';
import NewUserModal from '@/pages-scripts/portal/admin/user-management/system-users/index/components/NewUser.modal';

const Page = () => {
  const { setTabs } = useContext(AdminLayoutContext)
  const settingsTabsContext = useContext(UserManagementTabsContext)
  const { navigate } = useContext(AdminLayoutContext)
  const {
    modals, setModals
  } = useContext(UsersContext)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 2,
    }))

    settingsTabsContext.setTabs(prevState => ({
      ...prevState,
      tabs: userManagementTabsJson.tabs,
      selectedValue: 0,
    }))

    setIsLoaded(true)

  }, [])


  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}
      component="form"
      noValidate
    // onSubmit={handleSubmit}
    >

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <UserManagementTabs />
      </Box>

      {isLoaded && (
        <>

          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setModals(prevState => ({
                ...prevState,
                isNewUserModalOpen: true
              }))
            }}
          >
            New
          </Button>
          <br />
          <br />

          <Paper sx={{ p: 0 }} className='admin-card'>
            <SystemUserDataGrid />
          </Paper>

          <NewUserModal
            isOpened={modals.isNewUserModalOpen}
            onClose={() => {
              setModals(prevState => ({
                ...prevState,
                isNewUserModalOpen: false,
              }))
            }}
          />
        </>
      )}
    </Box>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
    >
      <UsersProvider>
        {page}
      </UsersProvider>
    </AdminLayout>
  )
}

export default Page
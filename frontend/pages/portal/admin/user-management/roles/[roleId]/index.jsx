'use client'

//library
import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';

// Mine
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import UserManagementTabsContext from '@/pages-scripts/portal/admin/user-management/tabs/UserManagementTabs.context';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import userManagementTabsJson from '@/pages-scripts/portal/admin/user-management/tabs/tabs.json';
import UserManagementTabs from '@/pages-scripts/portal/admin/user-management/tabs/tabs';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import PermissionsTable from '@/pages-scripts/portal/admin/user-management/roles/form/components/PermissionsTable';
import RoleProvider, { RoleContext } from '@/pages-scripts/portal/admin/user-management/roles/form/context/Role.context';

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Switch from '@mui/material/Switch';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material';
import DeleteRoleModal from '@/pages-scripts/portal/admin/user-management/roles/form/modals/DeleteRole.modal';
const DynamicRealTimeTextField = dynamic(() => import('@/components/realtime/TextFieldRow/TextField.realtime'), {
  ssr: false
});

const Page = () => {
  const theme = useTheme()

  const { navigate, setTabs } = useContext(AdminLayoutContext);
  const userManagementTabsContext = useContext(UserManagementTabsContext);
  const {
    entity,
    name, setName,
    currentName, setCurrentName,
    nameValue, setNameValue,
    isDashboardRead, setIsDashboardRead,
    isDashboardReadValue, setIsDashboardReadValue,
    isMediaManagerInboxOnly, setIsMediaManagerInboxOnly,
    isMediaManagerInboxOnlyValue, setIsMediaManagerInboxOnlyValue,
    isMediaManagerRead, setIsMediaManagerRead,
    isMediaManagerReadValue, setIsMediaManagerReadValue,
    isMediaManagerUpdate, setIsMediaManagerUpdate,
    isMediaManagerUpdateValue, setIsMediaManagerUpdateValue,
    isMediaManagerDelete, setIsMediaManagerDelete,
    isMediaManagerDeleteValue, setIsMediaManagerDeleteValue,
    isSiteDesignerRead, setIsSiteDesignerRead,
    isSiteDesignerReadValue, setIsSiteDesignerReadValue,
    isSiteDesignerUpdate, setIsSiteDesignerUpdate,
    isSiteDesignerUpdateValue, setIsSiteDesignerUpdateValue,
    isSiteDesignerDelete, setIsSiteDesignerDelete,
    isSiteDesignerDeleteValue, setIsSiteDesignerDeleteValue,
    isAdminRead, setIsAdminRead,
    isAdminReadValue, setIsAdminReadValue,
    isAdminUpdate, setIsAdminUpdate,
    isAdminUpdateValue, setIsAdminUpdateValue,
    isAdminDelete, setIsAdminDelete,
    isAdminDeleteValue, setIsAdminDeleteValue,
    isUserManagementRead, setIsUserManagementRead,
    isUserManagementReadValue, setIsUserManagementReadValue,
    isUserManagementUpdate, setIsUserManagementUpdate,
    isUserManagementUpdateValue, setIsUserManagementUpdateValue,
    isUserManagementDelete, setIsUserManagementDelete,
    isUserManagementDeleteValue, setIsUserManagementDeleteValue,
    modal, setModal,

    //helper functions
    saveRole,

  } = useContext(RoleContext)

  useEffect(() => {
    setTabs((prevState) => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 2,
    }));

    userManagementTabsContext.setTabs((prevState) => ({
      ...prevState,
      tabs: userManagementTabsJson.tabs,
      selectedValue: 1,
    }));

  }, []);

  const handleBack = (event) => {
    event.preventDefault();
    event.stopPropagation();

    navigate("/portal/admin/user-management/roles/");
  };

  const handleOpenDeleteModal = () => {
    setModal(prevState => ({
      ...prevState,
      modal_isDeleteRoleModalOpened: true
    }))
  }


  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        maxWidth: '900px',
        m: 'auto',
      }}
      component="form"
      noValidate
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <UserManagementTabs />
      </Box>

      <br />

      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb">
        <span
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={handleBack}
        >
          Roles
        </span>
        <Typography color="textPrimary">{currentName}</Typography>
      </Breadcrumbs>
      <br />

      <Paper elevation={3}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: "200px" }}>Name</TableCell>
                <TableCell>
                  <DynamicRealTimeTextField
                    entity={entity}
                    data={name}
                    onTextUpdate={(text) => {
                      setNameValue(text)
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />


      <PermissionsTable
        entity={entity}
        isDashboardRead={isDashboardRead}
        setIsDashboardReadValue={setIsDashboardReadValue}
        isMediaManagerInboxOnly={isMediaManagerInboxOnly}
        setIsMediaManagerInboxOnlyValue={setIsMediaManagerInboxOnlyValue}
        isMediaManagerRead={isMediaManagerRead}
        setIsMediaManagerReadValue={setIsMediaManagerReadValue}
        isMediaManagerUpdate={isMediaManagerUpdate}
        setIsMediaManagerUpdateValue={setIsMediaManagerUpdateValue}
        isMediaManagerDelete={isMediaManagerDelete}
        setIsMediaManagerDeleteValue={setIsMediaManagerDeleteValue}
        isSiteDesignerRead={isSiteDesignerRead}
        setIsSiteDesignerReadValue={setIsSiteDesignerReadValue}
        isSiteDesignerUpdate={isSiteDesignerUpdate}
        setIsSiteDesignerUpdateValue={setIsSiteDesignerUpdateValue}
        isSiteDesignerDelete={isSiteDesignerDelete}
        setIsSiteDesignerDeleteValue={setIsSiteDesignerDeleteValue}
        isAdminRead={isAdminRead}
        setIsAdminReadValue={setIsAdminReadValue}
        isAdminUpdate={isAdminUpdate}
        setIsAdminUpdateValue={setIsAdminUpdateValue}
        isAdminDelete={isAdminDelete}
        setIsAdminDeleteValue={setIsAdminDeleteValue}
        isUserManagementRead={isUserManagementRead}
        setIsUserManagementReadValue={setIsUserManagementReadValue}
        isUserManagementUpdate={isUserManagementUpdate}
        setIsUserManagementUpdateValue={setIsUserManagementUpdateValue}
        isUserManagementDelete={isUserManagementDelete}
        setIsUserManagementDeleteValue={setIsUserManagementDeleteValue}


      />
      <br />
      <Button
        variant="contained"
        onClick={saveRole}
      >
        Save
      </Button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />


      <Paper
        elevation={3}
        sx={{
          background: theme.palette.error.light,
          color: theme.palette.getContrastText(theme.palette.error.light),
        }}
      >
        <List sx={{ p: 0 }}>
          <HeaderRow label="Danger Zone" />
        </List>
        <TableContainer component={Paper} sx={{ background: "initial" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: "200px" }}>Delete Role</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleOpenDeleteModal}
                  >
                    Delete Role
                  </Button>

                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <br />
      <br />
      <br />
      <DeleteRoleModal
        isOpened={modal.modal_isDeleteRoleModalOpened}
        onClose={() => {
          setModal(prevState => ({
            ...prevState,
            modal_isDeleteRoleModalOpened: false
          }))
        }}
      />

    </Box>
  );
};


Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      // remove later
      hasNoEntity
    >
      <RoleProvider>
        {page}
      </RoleProvider>
    </AdminLayout>
  )
}

export default Page

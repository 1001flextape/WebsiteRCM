'use client'

//library
import React, { useContext, useEffect, useState } from 'react'

// Mine
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import UserManagementTabsContext from '@/pages-scripts/portal/admin/user-management/tabs/UserManagementTabs.context';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import userManagementTabsJson from '@/pages-scripts/portal/admin/user-management/tabs/tabs.json';
import UserManagementTabs from '@/pages-scripts/portal/admin/user-management/tabs/tabs';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
// ... (previous imports)

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
import PermissionsTable from '@/pages-scripts/portal/admin/user-management/roles/form/components/PermissionsTable';
import UserProvider, { UserContext } from '@/pages-scripts/portal/admin/user-management/system-users/form/context/SystemUser.context';
import UserChip from '@/components/chip/user.chip';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';

const Page = () => {
  const theme = useTheme()

  const [isLoaded, setIsLoaded] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState(['Admin', 'User', 'Manager']);

  const { navigate, setTabs } = useContext(AdminLayoutContext);
  const userManagementTabsContext = useContext(UserManagementTabsContext);
  const {
    entity,
    email, setEmail,
    roles, setRoles,


    isAdmin, setIsAdmin,
    isAdminValue, setIsAdminValue,
    isDeactivated, setIsDeactivated,
    isDeactivatedValue, setIsDeactivatedValue,


    callByType, setCallByType,
    circleColor, setCircleColor,
    firstName, setFirstName,
    labelColor, setLabelColor,
    lastName, setLastName,
    picture, setPicture,
    username, setUsername,
    displayName, setDisplayName,



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
  } = useContext(UserContext)

  const handleBlockToggle = () => {
    setIsBlocked((prevIsBlocked) => !prevIsBlocked);
  };

  const handleBack = (event) => {
    event.preventDefault();
    event.stopPropagation();

    navigate("/portal/admin/user-management/system-users/");
  };

  const handleRoleSelect = (event) => {
    const selectedRole = event.target.value;

    const role = roles.filter(r => r.id === selectedRole)

    // changed from many to one, keeping many logic throughtout the project but only selecting one.
    setSelectedRoles([role])

    // if (!selectedRoles.includes(selectedRole)) {
    //   setSelectedRoles((prevSelectedRoles) => [...prevSelectedRoles, selectedRole]);
    //   setAvailableRoles((prevAvailableRoles) =>
    //     prevAvailableRoles.filter((role) => role !== selectedRole)
    //   );
    // }
  };

  const handleChipDelete = (deletedRole) => {
    setSelectedRoles((prevSelectedRoles) => prevSelectedRoles.filter((role) => role !== deletedRole));
    setAvailableRoles((prevAvailableRoles) => [...prevAvailableRoles, deletedRole]);
  };


  useEffect(() => {
    setTabs((prevState) => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 2,
    }));

    userManagementTabsContext.setTabs((prevState) => ({
      ...prevState,
      tabs: userManagementTabsJson.tabs,
      selectedValue: 0,
    }));

    setIsLoaded(true);
  }, []);

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

      {isLoaded && (
        <>
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
              System Users
            </span>
            <Typography color="textPrimary">{email}</Typography>
          </Breadcrumbs>
          <br />

          <Paper elevation={3}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: "200px" }}>Display</TableCell>
                    <TableCell>

                      <UserChip
                        callByType={callByType}
                        circleColor={circleColor}
                        displayName={displayName}
                        email={email}
                        firstName={firstName}
                        labelColor={labelColor}
                        lastName={lastName}
                        picturePreview={picture}
                        username={username}
                      />

                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: "200px" }}>Email</TableCell>
                    <TableCell>{email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: "200px" }}>Is Deactivated</TableCell>
                    <TableCell>

                      <RealTimeSwitchRow
                        label={""}
                        // label, data, entity, onChange
                        data={isDeactivated}
                        entity={entity}
                        onChange={(value) => {
                          setIsDeactivated(value)
                          console.log('contents to be saved', value)
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <br />

          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Root Permissions" />
            </List>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: "200px" }}>Is Admin</TableCell>
                    <TableCell>

                      <RealTimeSwitchRow
                        label={""}
                        // label, data, entity, onChange
                        data={isAdmin}
                        entity={entity}
                        onChange={(value) => {
                          setIsAdminValue(value)
                          console.log('contents to be saved', value)
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <br />

          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Roles" />
            </List>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {/* Updated Select and Chips */}
                      <Select
                        value=""
                        onChange={handleRoleSelect}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value="" disabled>
                          Select Role
                        </MenuItem>
                        {roles.map((role) => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {selectedRoles.map((role) => (
                        <Chip
                          key={role.id}
                          label={role.name}
                          // onDelete={() => handleChipDelete(role.id)}
                          variant="outlined"
                          color="primary"
                          sx={{ margin: 0.5 }}
                        />
                      ))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <br />

          <p>Must select role "Custom Permissions" to changed permission table.</p>
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

          {/* <Paper
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
                    <TableCell sx={{ width: "200px" }}>Delete User</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                      >
                        Delete User
                      </Button>

                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper> */}

          <br />
          <Button
            variant="contained"
          >
            Save
          </Button>
          <br />
          <br />
          <br />
        </>
      )}
    </Box>
  );
};


Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      // remove later
      hasNoEntity
    >
      <UserProvider>
        {page}
      </UserProvider>
    </AdminLayout>
  )
}

export default Page

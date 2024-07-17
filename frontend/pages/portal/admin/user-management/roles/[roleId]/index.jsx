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

const Page = () => {
  const theme = useTheme()

  const [isLoaded, setIsLoaded] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState(['Admin', 'User', 'Manager']);

  const { navigate, setTabs } = useContext(AdminLayoutContext);
  const userManagementTabsContext = useContext(UserManagementTabsContext);

  const handleBlockToggle = () => {
    setIsBlocked((prevIsBlocked) => !prevIsBlocked);
  };

  const handleBack = (event) => {
    event.preventDefault();
    event.stopPropagation();

    navigate("/portal/admin/user-management/roles/");
  };

  const handleRoleSelect = (event) => {
    const selectedRole = event.target.value;

    if (!selectedRoles.includes(selectedRole)) {
      setSelectedRoles((prevSelectedRoles) => [...prevSelectedRoles, selectedRole]);
      setAvailableRoles((prevAvailableRoles) =>
        prevAvailableRoles.filter((role) => role !== selectedRole)
      );
    }
  };

  const handleChipDelete = (deletedRole) => {
    setSelectedRoles((prevSelectedRoles) => prevSelectedRoles.filter((role) => role !== deletedRole));
    setAvailableRoles((prevAvailableRoles) => [...prevAvailableRoles, deletedRole]);
  };


  useEffect(() => {
    setTabs((prevState) => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 0,
    }));

    userManagementTabsContext.setTabs((prevState) => ({
      ...prevState,
      tabs: userManagementTabsJson.tabs,
      selectedValue: 3,
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
              Roles
            </span>
            <Typography color="textPrimary">Name</Typography>
          </Breadcrumbs>
          <br />

          <Paper elevation={3}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: "200px" }}>Name</TableCell>
                    <TableCell>
                      TextField
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <br />


          <PermissionsTable />
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
      {page}
    </AdminLayout>
  )
}

export default Page

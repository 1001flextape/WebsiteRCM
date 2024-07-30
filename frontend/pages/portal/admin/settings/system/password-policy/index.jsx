'use client'

//library
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

// Mine
// import AdminLayoutContext from '../../../layout/adminLayout.context';
// import * as tabsJson from '../../tabs.json';
// import * as settingsTabsJson from '../tabs.json';
// import FaviconUpload from './favicon.upload';
// import SettingTabsContext from '../setting-tabs.context';
// import SettingTabs from '../tabs';
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import settingsTabsJson from '@/pages-scripts/portal/admin/settings/tabs/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import SettingTabs from '@/pages-scripts/portal/admin/settings/tabs/tabs';
import SettingTabsContext from '@/pages-scripts/portal/admin/settings/tabs/setting-tabs.context';
// import FaviconUpload from '@/pages-scripts/portal/admin/settings/website/favicon.upload';

// MUI
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
// import { getSettingsSiteGraphQL, postSettingsSiteGraphQL } from '@/pages-scripts/portal/admin/settings/site/site.graphql';
import { processGraphQLErrors } from '@/utils/graphql/processGraphQLErrors.func';
import { realtimeLink } from '@/utils/realtime/link';
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, useTheme } from '@mui/material';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

const ServiceListItem = ({ service, onDelete }) => {
  const theme = useTheme()

  const { navigate } = useContext(AdminLayoutContext)

  const rowStyles = {
    hover: 'pointer',
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    }
  }
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = (action) => {
    handleClose();
    // Handle the selected action (View, Delete, etc.)
    // You can add the logic based on the action.
  };

  return (
    <ListItem button sx={service.isSelected ? { backgroundColor: theme.palette.grey[200], ...rowStyles } : rowStyles}>
      <ListItemText primary={(<>
        {service.name} {service.isSelected && (
          <small>
            <strong>
              * Selected
            </strong>
          </small>
        )}
      </>
      )}

      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="menu" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {!service.isSelected && <MenuItem onClick={() => handleMenuSelect('select')}>Select</MenuItem>}
          <MenuItem onClick={() => handleMenuSelect('view')}>View</MenuItem>
          <MenuItem onClick={() => handleMenuSelect('delete')}>Delete</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const Page = () => {
  const router = useRouter()
  const theme = useTheme()

  const { setTabs } = React.useContext(AdminLayoutContext)
  const settingsTabsContext = React.useContext(SettingTabsContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const { navigate } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 0,
    }))

    settingsTabsContext.setTabs(prevState => ({
      ...prevState,
      tabs: settingsTabsJson.tabs,
      selectedValue: 2,
    }))

    setIsLoaded(true)

  }, [])





  return (
    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <SettingTabs />
      </Box>

      {isLoaded && (
        <>
          <br />

          <Breadcrumbs aria-label="breadcrumb">
            <span
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => navigate("/portal/admin/settings/system/")}
            >
              System
            </span>
            <Typography color="textPrimary">Password Policy</Typography>
          </Breadcrumbs>

          <br />

          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Password Policy" />
            </List>
            <div>
              <List
                sx={{
                  m: 0,
                }}
                className='admin-card'
              >

              </List>

            </div>
          </Paper>
          <br />

          {/* <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Email Templates" />
            </List>
            <div>
              <List
                sx={{
                  m: 0,
                }}
              >
                <ListItem
                  sx={{
                    py: 0,
                    px: 0,
                  }}
                // onClick={() => changeUrl("/portal/dashboard")}
                >
                  <ListItemButton>

                    <ListItemText>
                      <Typography color="inherit" variant="h6" component="h2"
                        style={{
                          // lineHeight: 1.1,
                          color: theme.palette.grey[900]
                        }}
                      >
                        Reset Password Email Template
                      </Typography>


                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>

            </div>
          </Paper>
          <br />
          <br /> */}
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
      hasNoEntity
    >
      {page}
    </AdminLayout>
  )
}

export default Page
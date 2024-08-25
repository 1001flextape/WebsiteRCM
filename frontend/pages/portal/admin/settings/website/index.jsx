'use client'

// library
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mine
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import settingsTabsJson from '@/pages-scripts/portal/admin/settings/tabs/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import SettingTabs from '@/pages-scripts/portal/admin/settings/tabs/tabs';
import SettingTabsContext, { SettingTabsProvider } from '@/pages-scripts/portal/admin/settings/tabs/setting-tabs.context';

// MUI
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material';


const Page = () => {
  const router = useRouter()
  const theme = useTheme();
  const { setTabs, navigate } = React.useContext(AdminLayoutContext)
  const settingsTabsContext = React.useContext(SettingTabsContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [favicon, setFavicon] = useState("")

  const { setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc } = React.useContext(AdminLayoutContext)

  const [anchorEl, setAnchorEl] = useState(null);

  const changeUrl = (href) => {
    navigate(href)
  }

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 0,
    }))

    settingsTabsContext.setTabs(prevState => ({
      ...prevState,
      tabs: settingsTabsJson.tabs,
      selectedValue: 0,
    }))

    setIsLoaded(true)
  }, [])

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}
    >

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <SettingTabs />
      </Box>

      {isLoaded && (
        <>
          <br />

          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="Website Settings Portal" />
            </List>
            <div className="admin-card">
              <p>Website settings serve as your portal to customize branding, headers, footers, colors, and more, enhancing your online presence.</p>
              <br />
              <Button onClick={() => changeUrl("/portal/admin/settings/website/settings")} variant="contained" color="secondary" type="submit">Start Customizing Now!</Button>
            </div>
          </Paper>

          <br />


          {/* Section 2 */}
          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <Typography variant="h6" sx={{ p: 2 }}>External Scripts</Typography>

              <HeaderRow
                label="HTML Head"
                secondaryAction={(
                  <>
                    <IconButton>
                      <AddCircleIcon
                        sx={{
                          color: theme.palette.grey[200],
                          '&:hover': {
                            color: theme.palette.grey[400],
                          },
                        }}
                      />
                    </IconButton>
                  </>
                )} />
            </List>
            <Box sx={{ p: 2 }}>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <Typography component="a" href="#" sx={{ textDecoration: 'none', color: '#1976d2' }}>Global CSS</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ textAlign: 'right' }}>
                    <IconButton onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Disable</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                    </Menu>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <List sx={{ p: 0 }}>
              <HeaderRow
                label="HTML Body"
                secondaryAction={(
                  <>
                    <IconButton>
                      <AddCircleIcon
                        sx={{
                          color: theme.palette.grey[200],
                          '&:hover': {
                            color: theme.palette.grey[400],
                          },
                        }}
                      />
                    </IconButton>
                  </>
                )}
              />
            </List>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <Typography component="a" href="#" sx={{ textDecoration: 'none', color: '#1976d2' }}>Cookie Policy</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ textAlign: 'right' }}>
                    <IconButton onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Disable</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                    </Menu>
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
                <Grid item xs={9}>
                  <Typography component="a" href="#" sx={{ textDecoration: 'none', color: '#1976d2' }}>Chat Bot</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ textAlign: 'right' }}>
                    <IconButton onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Disable</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                    </Menu>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          <br />
          <br />
          <br />
          <br />
        </>
      )}
    </Box>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout hasNoEntity>
      <SettingTabsProvider>
        {page}
      </SettingTabsProvider>
    </AdminLayout>
  )
}

export default Page

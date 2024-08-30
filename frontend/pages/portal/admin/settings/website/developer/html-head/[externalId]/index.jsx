'use client'

// library
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mine
import tabsJson from '@/pages-scripts/portal/admin/tabs.json';
import settingsTabsJson from '@/pages-scripts/portal/admin/settings/tabs/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import SettingTabsContext, { SettingTabsProvider } from '@/pages-scripts/portal/admin/settings/tabs/setting-tabs.context';

// MUI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';

const Page = () => {
  const router = useRouter()
  const { setTabs, navigate } = React.useContext(AdminLayoutContext)
  const settingsTabsContext = React.useContext(SettingTabsContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const [name, setName] = useState("")
  const [scriptType, setScriptType] = useState("")
  const [code, setCode] = useState("")

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add save logic here
  }

  return (
    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            sx={{ lineHeight: "50px", cursor: "pointer" }}
            underline="hover"
            color="inherit"
            onClick={() => navigate("/portal/admin/settings/website")}
          >
            Website Settings
          </Link>
          <Link
            sx={{ lineHeight: "50px", cursor: "pointer" }}
            underline="hover"
            color="inherit"
            onClick={() => navigate("/portal/admin/settings/website/developer")}
          >
            Developer Settings
          </Link>
          <Typography
            sx={{ lineHeight: "50px", cursor: "pointer" }}
            color="text.primary"
          >
            HTML Head
          </Typography>
        </Breadcrumbs>
      </Box>

      {isLoaded && (
        <>
          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              <HeaderRow label="HTML Head" />
              <br />
              <ListItem>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <TextField
                  fullWidth
                  select
                  label="Script"
                  value={scriptType}
                  onChange={(e) => setScriptType(e.target.value)}
                >
                  <MenuItem value="css">CSS</MenuItem>
                  <MenuItem value="js">JavaScript</MenuItem>
                </TextField>
              </ListItem>
              <ListItem>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <Button variant="contained" onClick={handleSubmit}>Save</Button>
              </ListItem>
            </List>
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

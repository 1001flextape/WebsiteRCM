import React, { useContext, useEffect } from 'react';
import AdminLayout from '@/layouts/admin/layout';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Breadcrumbs, Divider, Link, List, ListItem, ListItemText, styled, useTheme } from '@mui/material';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import NewPagesNotReadyDataGrid from '@/pages-scripts/portal/dashboard/new-pages/not-ready/components/NewPagesNotReadyDataGrid';


function Page() {
  const { navigate, setTabs } = useContext(AdminLayoutContext)
  // getDashboardGraphQL

  useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: [],
    }))
  }, [])

  return (
    <Box sx={{ flexGrow: 1, width: '100%', maxWidth: '900px', m: 'auto', mt: 2 }}>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          sx={{ lineHeight: "50px", cursor: "pointer" }}
          underline="hover"
          color="inherit"
          onClick={() => navigate("/portal/dashboard")}
        >
          Dashboard
        </Link>
        <Link
          sx={{ lineHeight: "50px", cursor: "pointer" }}
          underline="hover"
          color="inherit"
          onClick={() => navigate("/portal/dashboard")}
        >
          New Pages
        </Link>
        <Typography
          sx={{ lineHeight: "50px", cursor: "pointer" }}
          color="text.primary"
        >
          Not Ready
        </Typography>
      </Breadcrumbs>


      <Paper elevation={3} sx={{ p: 0 }}>
        <NewPagesNotReadyDataGrid />
      </Paper>
    </Box>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
    >
      {page}
    </AdminLayout>
  );
}

export default Page;

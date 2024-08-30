import React, { useState, useEffect, useContext } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Tabs, Tab, Box, useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { getPagesGraphQL } from '@/pages-scripts/portal/site/pages/index/store/getPages.store';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function PagesSystemModal({ isOpened, onClose, setInput }) {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const [pagesData, setPagesData] = useState([]);
  const [systemData, setSystemData] = useState([{
    id: "/portal/dashboard/",
    slug: "/portal/dashboard/",
  }]);

  const { CircleStatusSuccess, CircleStatusDanger, navigate } = useContext(AdminLayoutContext);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  useEffect(() => {
    getPagesGraphQL({}).then(response => {
      const data = response.data.backendSiteDesignerPage_getManyWithPagination || { rows: [] };
      setPagesData(data.rows);
    });
  }, []);

  const commonColumns = [
    {
      field: 'slug',
      headerName: 'Slug',
      width: 250,
      renderCell: (params) => (
        <p
          onClick={() => navigate(`/portal/site/pages/${params.row.id}`)}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          {params.row.slug}
        </p>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            if (onClose) onClose()
            if (setInput) setInput(params.row.slug);
          }}
        >
          Select
        </Button>
      ),
    },
  ];

  const pagesColumns = [
    {
      field: 'isReady',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        params.row.isReady === true ? <CircleStatusSuccess /> : <CircleStatusDanger />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
    },
    ...commonColumns,
  ];

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{ style: { padding: 0 } }}
    >
      <DialogTitle style={{ padding: '16px 24px' }}>
        Pages and System Options
      </DialogTitle>

      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="Pages and System Tabs"
        sx={{
          color: theme.palette.grey[200],
          backgroundColor: theme.palette.grey[700],
          m: 0,
        }}
        TabIndicatorProps={{
          sx: {
            color: theme.palette.grey[300],
            backgroundColor: theme.palette.grey[200],
          },
        }}
      >
        <Tab label="Pages" sx={{ color: theme.palette.grey[200] }} />
        <Tab label="System" sx={{ color: theme.palette.grey[200] }} />
      </Tabs>

      <DialogContent style={{
        padding: '0',
        minWidth: "300px",
      }}>
        {tabIndex === 0 && (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={pagesData}
              columns={pagesColumns}
              pageSize={10}
              getRowClassName={(params, rowIndex) =>
                rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
              }
              disableColumnFilter
              disableColumnMenu
              disableSelectionOnClick
            />
          </div>
        )}

        {tabIndex === 1 && (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={systemData}
              columns={commonColumns}
              pageSize={10}
              getRowClassName={(params, rowIndex) =>
                rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
              }
              disableColumnFilter
              disableColumnMenu
              disableSelectionOnClick
            />
          </div>
        )}
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px' }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PagesSystemModal;

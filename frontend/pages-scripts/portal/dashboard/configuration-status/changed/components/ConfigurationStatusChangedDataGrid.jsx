import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { getConfigurationChangedGraphQL } from '../store/getConfigurationStatusChangeDataGrid.store';

export default function ConfigurationStatusNotReadyDataGrid() {

  const {
    //status circles
    CircleStatusSuccess,
    CircleStatusDanger,
    //links
    navigate,
  } = React.useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (event, id) => {
    setSelectedId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const columns = [
    {
      field: 'isReady',
      headerName: 'Ready?',
      width: 120,
      renderCell: (params) => {
        return params.row.isReady === true
          ? <CircleStatusSuccess />
          : <CircleStatusDanger />

      },
    },
    {
      field: 'name',
      headerName: 'Feature',
      width: 350,
      renderCell: (params) => {
        console.log('params,', params)
        return (
          <>
            <p onClick={() => navigate(params.row.url)}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {params.row.name}
            </p>
            {/* navigate(`/portal/site/pages/${params.id}`); */}
          </>
        )
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton
            size="small"
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(e) => handleClick(e, params.row.id)}
          >
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={selectedId === params.row.id && Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>View Page</MenuItem>
            {/* Add more actions if required */}
          </Menu>
        </div>
      ),
    },
  ];

  const [rows, setRows] = useState([])

  useEffect(() => {
    getConfigurationChangedGraphQL().then(response => {
      const data = response.data.backendProjectStatusLists_getConfigurationChanged || { rows: [] }

      setRows(data.map((row, i) => {
        let url;

        switch (row.name.toLowerCase()) {
          case "organization":
            url = "/portal/admin/settings/organization"
            break;
          case "background color":
            url = "/portal/admin/settings/website/settings/background-color"
            break;
          case "colors":
            url = "/portal/admin/settings/website/settings/colors"
            break;
          case "column":
            url = "/portal/admin/settings/website/settings/column"
            break;
          case "font":
            url = "/portal/admin/settings/website/settings/font"
            break;
          case "footer":
            url = "/portal/admin/settings/website/settings/footer"
            break;
          case "header":
            url = "/portal/admin/settings/website/settings/header"
            break;
          case "link":
            url = "/portal/admin/settings/website/settings/link"
            break;
          case "browser":
            url = "/portal/admin/settings/website/settings/browser-tabs"
            break;
        }

        return {
          id: i,
          ...row,
          url,
        }
      }))
      setIsLoaded(true)

    })
  }, [])

  return (
    <>
      {isLoaded && (
        <>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={25}
              getRowClassName={(params, rowIndex) =>
                rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
              }
              rowHover
              disableColumnFilter // Disable column filters
              disableColumnMenu   // Disable column menu (sorting options)
              disableSelectionOnClick // Disable row selection click feedback

            // onRowClick={(params) => {
            //   navigate(`/portal/site/pages/${params.id}`);
            // }}
            />
          </div>
        </>
      )}
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import UserChip from '@/components/chip/user.chip';
import { getBackendUsersGraphQL } from '../store/getBackendUsers.store';

export default function SystemUserDataGrid() {
  const { navigate } = React.useContext(AdminLayoutContext);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getBackendUsersGraphQL({}).then(response => {
      const data = response.data.backendUser_getManyWithPagination || { rows: [] };
      setRows(data.rows);
    });
  }, []);

  const firstColumn = [
    {
      field: 'display',
      headerName: 'Display',
      width: 200,
      renderCell: (params) => (
        <p onClick={() => navigate(`/portal/admin/user-management/system-users/${params.row.id}`)}
          style={{
            cursor: 'pointer',
          }}>
          <UserChip
            callByType={params.row.callByType}
            circleColor={params.row.circleColor}
            displayName={params.row.displayName}
            firstName={params.row.firstName}
            labelColor={params.row.labelColor}
            lastName={params.row.lastName}
            picturePreview={params.row.picturePreview}
            username={params.row.username}
            email={params.row.email}
          />
        </p>
      ),
    },
  ];

  const otherColumns = [
    {
      field: 'isAdmin',
      headerName: 'Is Admin',
      width: 100,
      sortable: false,
      renderCell: (params) => <div>{params.row.isAdmin ? <p>Yes</p> : <p>No</p>}</div>,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 250,
      renderCell: (params) => <p>{!params.row.isAdmin && params.row.roleName}</p>,
    },
    {
      field: 'isDeactivated',
      headerName: 'Is Deactivated',
      width: 130,
      sortable: false,
      renderCell: (params) => <div>{params.row.isDeactivated ? <p>Yes</p> : <p>No</p>}</div>,
    },
  ];

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      {/* First column (fixed) */}
      <Box sx={{ flex: '0 0 200px', borderRight: '1px solid #ddd' }}>
        <DataGrid
          rows={rows}
          columns={firstColumn}
          pageSize={25}
          hideFooter
          disableColumnFilter
          disableColumnMenu
          disableSelectionOnClick
          getRowClassName={(params, rowIndex) =>
            rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
          }
          sx={{
            borderRadius: '8px', // Set default rounding
            borderTopRightRadius: 0, // Remove top-right radius
            borderBottomRightRadius: 0, // Remove bottom-right radius
          }}
        />
      </Box>

      {/* Other columns (scrollable) */}
      <Box sx={{ flex: '1 1 auto', overflowX: 'auto' }}>
        <DataGrid
          rows={rows}
          columns={otherColumns}
          pageSize={25}
          hideFooter
          disableColumnFilter
          disableColumnMenu
          disableSelectionOnClick
          getRowClassName={(params, rowIndex) =>
            rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
          }
          sx={{
            borderRadius: '8px', // Set default rounding
            borderTopLeftRadius: 0, // Remove top-left radius
            borderBottomLeftRadius: 0, // Remove bottom-left radius
          }}
        />
      </Box>
    </Box>
  );
}

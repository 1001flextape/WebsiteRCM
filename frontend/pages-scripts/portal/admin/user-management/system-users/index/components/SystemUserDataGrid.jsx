import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { useRouter } from 'next/navigation';
// import { getPagesGraphQL } from '../store/getPages.store';
import UserChip from '@/components/chip/user.chip';
import { getBackendUsersGraphQL } from '../store/getBackendUsers.store';

export default function SystemUserDataGrid() {
  const router = useRouter()

  const {
    //status circles
    CircleStatusSuccess,
    CircleStatusDanger,
    //links
    navigate,
  } = React.useContext(AdminLayoutContext)

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
      field: 'display',
      headerName: 'Display',
      width: 300,
      renderCell: (params) => {
        return (
          <p onClick={() => navigate(`/portal/admin/user-management/system-users/${params.row.id}`)}
            style={{
              cursor: "pointer",
            }}
          >
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

        )
      },
    }, 
    {
      field: 'isAdmin',
      headerName: 'Is Admin',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <div>
          {params.row.isAdmin && (
            <p>Yes</p>
          )}
          {!params.row.isAdmin && (
            <p>No</p>
          )}
        </div>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 250,
      renderCell: (params) => {

        return (
          <>
            <p>
              {params.row.roleName}
            </p>
            {/* navigate(`/portal/site/pages/${params.id}`); */}
          </>
        )
      }
    }, 
    {
      field: 'isDeactivated',
      headerName: 'Is Deactivated',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <div>
          {params.row.isDeactivated && (
            <p>Yes</p>
          )}
          {!params.row.isDeactivated && (
            <p>No</p>
          )}
        </div>
      ),
    },

    // isDeactivated
  ];

  const [rows, setRows] = useState([
    //   {
    //   id: 42,
    //   email: "example@email.com",
    //   isAdmin: false,
    //   roles: [
    //     {
    //       id: 43,
    //       name: "Content Creator"
    //     }
    //   ]
    // }
  ])

  useEffect(() => {
    getBackendUsersGraphQL({}).then(response => {
      const data = response.data.backendUser_getManyWithPagination || { rows: [] }

      setRows(data.rows)


    })
  }, [])

  return (
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
  );
}

import React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';

const PermissionsTable = ({
  entity,
  isDisabled,

  isDashboardRead,
  setIsDashboardReadValue,

  isMediaManagerInboxOnly,
  setIsMediaManagerInboxOnlyValue,

  isMediaManagerRead,
  setIsMediaManagerReadValue,

  isMediaManagerUpdate,
  setIsMediaManagerUpdateValue,

  isMediaManagerDelete,
  setIsMediaManagerDeleteValue,

  isSiteDesignerRead,
  setIsSiteDesignerReadValue,

  isSiteDesignerUpdate,
  setIsSiteDesignerUpdateValue,

  isSiteDesignerDelete,
  setIsSiteDesignerDeleteValue,

  isAdminRead,
  setIsAdminReadValue,

  isAdminUpdate,
  setIsAdminUpdateValue,

  isAdminDelete,
  setIsAdminDeleteValue,

  isUserManagementRead,
  setIsUserManagementReadValue,

  isUserManagementUpdate,
  setIsUserManagementUpdateValue,

  isUserManagementDelete,
  setIsUserManagementDeleteValue,

  //application Logic
  onClickMediaManageUpdate,
  onClickMediaManageInboxOnly,
  onClickMediaManageDelete,
  onClickMediaManageRead,
  onClickSiteDesignerUpdate,
  onClickSiteDesignerDelete,
  onClickAdminUpdate,
  onClickAdminDelete,
  onClickUserManagementUpdate,
  onClickUserManagementDelete,
}) => {

  return (
    <Paper elevation={3}>
      <List sx={{ p: 0 }}>
        <HeaderRow label="Permissions" />
      </List>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>


            {/* Dashboard */}
            <TableRow>
              <TableCell sx={{ width: "200px" }}>Dashboard</TableCell>
              <TableCell>
                <List>
                  <ListItem>
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Read"}
                      // label, data, entity, onChange
                      data={isDashboardRead}
                      entity={entity}
                      onChange={(value) => {
                        setIsDashboardReadValue(value)
                      }}
                      shouldAllowDataToChange={true}
                    />
                    {/* <Checkbox />
                    Read */}
                  </ListItem>
                </List>
              </TableCell>
            </TableRow>


            {/* Media Manager */}
            <TableRow>
              <TableCell sx={{ width: "200px" }}>Media Manager</TableCell>
              <TableCell>
                <List>
                  <ListItem>
                    {/* <Checkbox />
                    Inbox Only */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Inbox Only"}
                      // label, data, entity, onChange
                      data={isMediaManagerInboxOnly}
                      entity={entity}
                      onChange={(value) => {
                        setIsMediaManagerInboxOnlyValue(value)

                        if (onClickMediaManageInboxOnly) onClickMediaManageInboxOnly(value);
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>
                  <ListItem>
                    {/* <Checkbox />
                    Read */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Read"}
                      // label, data, entity, onChange
                      data={isMediaManagerRead}
                      entity={entity}
                      onChange={(value) => {
                        setIsMediaManagerReadValue(value)

                        if (onClickMediaManageRead) onClickMediaManageRead(value);
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>
                  <ListItem>
                    {/* <Checkbox />
                    Update */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Update"}
                      // label, data, entity, onChange
                      data={isMediaManagerUpdate}
                      entity={entity}
                      onChange={(value) => {
                        setIsMediaManagerUpdateValue(value)
                        if (onClickMediaManageUpdate) onClickMediaManageUpdate(value);
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>
                  <ListItem>
                    {/* <Checkbox />
                    Delete */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Delete"}
                      // label, data, entity, onChange
                      data={isMediaManagerDelete}
                      entity={entity}
                      onChange={(value) => {
                        setIsMediaManagerDeleteValue(value)
                        if (onClickMediaManageDelete) onClickMediaManageDelete(value);
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>

                </List>
              </TableCell>
            </TableRow>


            {/* Site Manager Website */}
            <TableRow>
              <TableCell sx={{ width: "200px" }}>Website</TableCell>
              <TableCell>
                <List>
                  <ListItem>
                    {/* <Checkbox />
                    Read */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Read"}
                      // label, data, entity, onChange
                      data={isSiteDesignerRead}
                      entity={entity}
                      onChange={(value) => {
                        setIsSiteDesignerReadValue(value)
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>
                  <ListItem>
                    {/* <Checkbox />
                    Update */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Update"}
                      // label, data, entity, onChange
                      data={isSiteDesignerUpdate}
                      entity={entity}
                      onChange={(value) => {
                        setIsSiteDesignerUpdateValue(value)
                        if (onClickSiteDesignerUpdate) onClickSiteDesignerUpdate(value);
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>
                  <ListItem>
                    {/* <Checkbox />
                    Delete */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Delete"}
                      // label, data, entity, onChange
                      data={isSiteDesignerDelete}
                      entity={entity}
                      onChange={(value) => {
                        setIsSiteDesignerDeleteValue(value)
                        if (onClickSiteDesignerDelete) onClickSiteDesignerDelete(value);
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>

                </List>
              </TableCell>
            </TableRow>


            {/* Admin */}
            <TableRow>
              <TableCell sx={{ width: "200px" }}>Admin (except user management)</TableCell>
              <TableCell>
                <List>
                  <ListItem>
                    {/* <Checkbox />
                    Read */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Read"}
                      // label, data, entity, onChange
                      data={isAdminRead}
                      entity={entity}
                      onChange={(value) => {
                        setIsAdminReadValue(value)
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>
                  <ListItem>
                    {/* <Checkbox />
                    Update */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Update"}
                      // label, data, entity, onChange
                      data={isAdminUpdate}
                      entity={entity}
                      onChange={(value) => {
                        setIsAdminUpdateValue(value)
                        if (onClickAdminUpdate) onClickAdminUpdate(value);
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>
                  <ListItem>
                    {/* <Checkbox />
                    Delete */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Delete"}
                      // label, data, entity, onChange
                      data={isAdminDelete}
                      entity={entity}
                      onChange={(value) => {
                        setIsAdminDeleteValue(value)
                        if (onClickAdminDelete) onClickAdminDelete(value);
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>

                </List>
              </TableCell>
            </TableRow>



            {/* User Management */}
            <TableRow>
              <TableCell sx={{ width: "200px" }}>User Management</TableCell>
              <TableCell>
                <List>
                  <ListItem>
                    {/* <Checkbox />
                    Read */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Read"}
                      // label, data, entity, onChange
                      data={isUserManagementRead}
                      entity={entity}
                      onChange={(value) => {
                        setIsUserManagementReadValue(value)
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>
                  <ListItem>
                    {/* <Checkbox />
                    Update */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Update"}
                      // label, data, entity, onChange
                      data={isUserManagementUpdate}
                      entity={entity}
                      onChange={(value) => {
                        setIsUserManagementUpdateValue(value)
                        if (onClickUserManagementUpdate) onClickUserManagementUpdate(value);
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>
                  <ListItem>
                    {/* <Checkbox />
                    Delete */}
                    <RealTimeSwitchRow
                      isDisabled={isDisabled}
                      label={"Delete / Deactivate"}
                      // label, data, entity, onChange
                      data={isUserManagementDelete}
                      entity={entity}
                      onChange={(value) => {
                        setIsUserManagementDeleteValue(value)
                        if (onClickUserManagementDelete) onClickUserManagementDelete(value);
                      }}
                      shouldAllowDataToChange={true}
                    />
                  </ListItem>

                </List>
              </TableCell>
            </TableRow>

            {/* <TableBody>
            {permissionsData.map((row, rowIndex) => (
              <TableRow>
                <TableCell sx={{ width: "200px" }}>{row.label}</TableCell>
                <TableCell>
                  <List>
                    {row.lists.map((listItem, listItemIndex) => (
                      <ListItem>
                        <Checkbox />
                        {listItem.name}
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <RealTimeSwitchRow
            label={(
              <>
                <div style={isReadyValue ? circleStatusSuccessStyle : circleStatusDangerStyle}></div>
                &nbsp;
                <span>Ready?</span>
              </>
            )}
            // label, data, entity, onChange
            data={isReady}
            entity={entity}
            onChange={(value) => {
              setIsReadyValue(value)
            }}
          /> */}
    </Paper >
  );
};

export default PermissionsTable;

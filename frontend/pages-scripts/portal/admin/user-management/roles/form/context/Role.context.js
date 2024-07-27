// Libraries
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

// code
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { getRoleRealTimeGraphQL } from '../store/getRoleRealTime.store';
import { getSocketId } from '@/utils/realtime/socket';
import { postRoleGraphQL } from '../store/postRole.store';
import { deleteRoleGraphQL } from '../store/deleteRole.store';

export const RoleContext = React.createContext();

export function RoleProvider({ children }) {
  // in
  const { navigate } = useContext(AdminLayoutContext);


  const [isLoaded, setIsLoaded] = useState(false);
  const [entity, setEntity] = useState("")

  // non realtime props
  const [currentName, setCurrentName] = useState("")

  // realtime props
  const [id, setId] = useState()
  const [name, setName] = useState("")
  const [nameValue, setNameValue] = useState("")
  const [isDashboardRead, setIsDashboardRead] = useState(false);
  const [isDashboardReadValue, setIsDashboardReadValue] = useState(false);
  const [isMediaManagerInboxOnly, setIsMediaManagerInboxOnly] = useState(false);
  const [isMediaManagerInboxOnlyValue, setIsMediaManagerInboxOnlyValue] = useState(false);
  const [isMediaManagerRead, setIsMediaManagerRead] = useState(false);
  const [isMediaManagerReadValue, setIsMediaManagerReadValue] = useState(false);
  const [isMediaManagerUpdate, setIsMediaManagerUpdate] = useState(false);
  const [isMediaManagerUpdateValue, setIsMediaManagerUpdateValue] = useState(false);
  const [isMediaManagerDelete, setIsMediaManagerDelete] = useState(false);
  const [isMediaManagerDeleteValue, setIsMediaManagerDeleteValue] = useState(false);
  const [isSiteDesignerRead, setIsSiteDesignerRead] = useState(false);
  const [isSiteDesignerReadValue, setIsSiteDesignerReadValue] = useState(false);
  const [isSiteDesignerUpdate, setIsSiteDesignerUpdate] = useState(false);
  const [isSiteDesignerUpdateValue, setIsSiteDesignerUpdateValue] = useState(false);
  const [isSiteDesignerDelete, setIsSiteDesignerDelete] = useState(false);
  const [isSiteDesignerDeleteValue, setIsSiteDesignerDeleteValue] = useState(false);
  const [isAdminRead, setIsAdminRead] = useState(false);
  const [isAdminReadValue, setIsAdminReadValue] = useState(false);
  const [isAdminUpdate, setIsAdminUpdate] = useState(false);
  const [isAdminUpdateValue, setIsAdminUpdateValue] = useState(false);
  const [isAdminDelete, setIsAdminDelete] = useState(false);
  const [isAdminDeleteValue, setIsAdminDeleteValue] = useState(false);
  const [isUserManagementRead, setIsUserManagementRead] = useState(false);
  const [isUserManagementReadValue, setIsUserManagementReadValue] = useState(false);
  const [isUserManagementUpdate, setIsUserManagementUpdate] = useState(false);
  const [isUserManagementUpdateValue, setIsUserManagementUpdateValue] = useState(false);
  const [isUserManagementDelete, setIsUserManagementDelete] = useState(false);
  const [isUserManagementDeleteValue, setIsUserManagementDeleteValue] = useState(false);

  const [modal, setModal] = React.useState({
    // modals
    modal_isDeleteRoleModalOpened: false,
  })

  const router = useRouter();
  const { roleId } = router.query;
  // console.log('query', router.query);

  useEffect(() => {
    console.log('roleId', roleId);
    if (roleId) {
      getRoleRealTimeGraphQL({
        socketId: getSocketId(),
        roleId,
      }).then(response => {
        const data = response.data.backendRole_getOneRealTime
        // Handle response
        setId(data.id)
        setCurrentName(data.currentName)
        setName(data.name)
        setNameValue(data.name)
        setEntity(data.entity)
        setIsDashboardRead(data.isDashboardRead)
        setIsDashboardReadValue(data.isDashboardRead)
        setIsMediaManagerInboxOnly(data.isMediaManagerInboxOnly)
        setIsMediaManagerInboxOnlyValue(data.isMediaManagerInboxOnly)
        setIsMediaManagerRead(data.isMediaManagerRead)
        setIsMediaManagerReadValue(data.isMediaManagerRead)
        setIsMediaManagerUpdate(data.isMediaManagerUpdate)
        setIsMediaManagerUpdateValue(data.isMediaManagerUpdate)
        setIsMediaManagerDelete(data.isMediaManagerDelete)
        setIsMediaManagerDeleteValue(data.isMediaManagerDelete)
        setIsSiteDesignerRead(data.isSiteDesignerRead)
        setIsSiteDesignerReadValue(data.isSiteDesignerRead)
        setIsSiteDesignerUpdate(data.isSiteDesignerUpdate)
        setIsSiteDesignerUpdateValue(data.isSiteDesignerUpdate)
        setIsSiteDesignerDelete(data.isSiteDesignerDelete)
        setIsSiteDesignerDeleteValue(data.isSiteDesignerDelete)
        setIsAdminRead(data.isAdminRead)
        setIsAdminReadValue(data.isAdminRead)
        setIsAdminUpdate(data.isAdminUpdate)
        setIsAdminUpdateValue(data.isAdminUpdate)
        setIsAdminDelete(data.isAdminDelete)
        setIsAdminDeleteValue(data.isAdminDelete)
        setIsUserManagementRead(data.isUserManagementRead)
        setIsUserManagementReadValue(data.isUserManagementRead)
        setIsUserManagementUpdate(data.isUserManagementUpdate)
        setIsUserManagementUpdateValue(data.isUserManagementUpdate)
        setIsUserManagementDelete(data.isUserManagementDelete)
        setIsUserManagementDeleteValue(data.isUserManagementDelete)

        setIsLoaded(true);
      });
    }
  }, [roleId]);

  const saveRole = () => {
    postRoleGraphQL({
      id,
      name: nameValue,
      isDashboardRead: isDashboardReadValue,
      isMediaManagerInboxOnly: isMediaManagerInboxOnlyValue,
      isMediaManagerRead: isMediaManagerReadValue,
      isMediaManagerUpdate: isMediaManagerUpdateValue,
      isMediaManagerDelete: isMediaManagerDeleteValue,
      isSiteDesignerRead: isSiteDesignerReadValue,
      isSiteDesignerUpdate: isSiteDesignerUpdateValue,
      isSiteDesignerDelete: isSiteDesignerDeleteValue,
      isAdminRead: isAdminReadValue,
      isAdminUpdate: isAdminUpdateValue,
      isAdminDelete: isAdminDeleteValue,
      isUserManagementRead: isUserManagementReadValue,
      isUserManagementUpdate: isUserManagementUpdateValue,
      isUserManagementDelete: isUserManagementDeleteValue,
    }).then(response => {
      enqueueSnackbar("Role Saved")
    })
  }

  const deleteRole = () => {
    deleteRoleGraphQL({
      id,
    }).then(response => {
      navigate("/portal/admin/user-management/roles/")
    })
  }

  return (
    <>
      {isLoaded && (
        <>
          <RoleContext.Provider value={{
            entity, setEntity,
            currentName, setCurrentName,
            name, setName,
            nameValue, setNameValue,
            isDashboardRead, setIsDashboardRead,
            isDashboardReadValue, setIsDashboardReadValue,
            isMediaManagerInboxOnly, setIsMediaManagerInboxOnly,
            isMediaManagerInboxOnlyValue, setIsMediaManagerInboxOnlyValue,
            isMediaManagerRead, setIsMediaManagerRead,
            isMediaManagerReadValue, setIsMediaManagerReadValue,
            isMediaManagerUpdate, setIsMediaManagerUpdate,
            isMediaManagerUpdateValue, setIsMediaManagerUpdateValue,
            isMediaManagerDelete, setIsMediaManagerDelete,
            isMediaManagerDeleteValue, setIsMediaManagerDeleteValue,
            isSiteDesignerRead, setIsSiteDesignerRead,
            isSiteDesignerReadValue, setIsSiteDesignerReadValue,
            isSiteDesignerUpdate, setIsSiteDesignerUpdate,
            isSiteDesignerUpdateValue, setIsSiteDesignerUpdateValue,
            isSiteDesignerDelete, setIsSiteDesignerDelete,
            isSiteDesignerDeleteValue, setIsSiteDesignerDeleteValue,
            isAdminRead, setIsAdminRead,
            isAdminReadValue, setIsAdminReadValue,
            isAdminUpdate, setIsAdminUpdate,
            isAdminUpdateValue, setIsAdminUpdateValue,
            isAdminDelete, setIsAdminDelete,
            isAdminDeleteValue, setIsAdminDeleteValue,
            isUserManagementRead, setIsUserManagementRead,
            isUserManagementReadValue, setIsUserManagementReadValue,
            isUserManagementUpdate, setIsUserManagementUpdate,
            isUserManagementUpdateValue, setIsUserManagementUpdateValue,
            isUserManagementDelete, setIsUserManagementDelete,
            isUserManagementDeleteValue, setIsUserManagementDeleteValue,
            modal, setModal,

            //helper functions
            saveRole,
            deleteRole,
          }}>
            {children}
          </RoleContext.Provider>
        </>
      )}
    </>
  );
}

export default RoleProvider;

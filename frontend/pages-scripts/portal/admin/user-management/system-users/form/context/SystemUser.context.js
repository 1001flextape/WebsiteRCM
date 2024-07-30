// Libraries
import React, { useContext, useEffect, useState } from 'react'
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { useRouter } from 'next/router';
import { getUserRealTimeGraphQL } from '../store/getUserRealTime.store';
import { getSocketId } from '@/utils/realtime/socket';

export const UserContext = React.createContext();

export function UserProvider({ children }) {

  const { navigate } = useContext(AdminLayoutContext)

  // query params
  const router = useRouter();
  const { backendUserId } = router.query;
  console.log('router', router.query, router.query.backendUserId)

  const [isLoaded, setIsLoaded] = useState(false);
  const [entity, setEntity] = useState("")

  // non realtime props
  const [roles, setRoles] = useState([])
  const [email, setEmail] = useState("")
  
  const [callByType, setCallByType] = useState()
  const [circleColor, setCircleColor] = useState()
  const [firstName, setFirstName] = useState()
  const [labelColor, setLabelColor] = useState()
  const [lastName, setLastName] = useState()
  const [picture, setPicture] = useState()
  const [username, setUsername] = useState()
  const [displayName, setDisplayName] = useState()
  // realtime props
  const [isAdmin, setIsAdmin] = useState("")
  const [isAdminValue, setIsAdminValue] = useState("")
  const [isDeactivated, setIsDeactivated] = useState("")
  const [isDeactivatedValue, setIsDeactivatedValue] = useState("")
  const [id, setId] = useState()
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


  useEffect(() => {
    console.log('backendUserId', backendUserId);
    if (backendUserId) {
      getUserRealTimeGraphQL({
        socketId: getSocketId(),
        id: backendUserId,
      }).then(response => {
        const roleList = response.data.backendRole_getMany
        const data = response.data.backendUser_getOneRealTime
        // Handle response
        setEntity(data.entity)
        setRoles(roleList)
        setId(data.id)
        setEmail(data.email)
        setCallByType(data.callByType)
        setCircleColor(data.circleColor)
        setFirstName(data.firstName)
        setLabelColor(data.labelColor)
        setLastName(data.lastName)
        setPicture(data.picture)
        setUsername(data.username)
        setDisplayName(data.displayName)


        setIsAdmin(data.isAdmin)
        setIsDeactivated(data.isDeactivated)




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
  }, [backendUserId]);


  return (

    <>
      {isLoaded && (
        <>
          <UserContext.Provider value={{
            entity, setEntity,
            email, setEmail,
            roles, setRoles,


            callByType, setCallByType,
            circleColor, setCircleColor,
            firstName, setFirstName,
            labelColor, setLabelColor,
            lastName, setLastName,
            picture, setPicture,
            username, setUsername,
            displayName, setDisplayName,


            isAdmin, setIsAdmin,
            isAdminValue, setIsAdminValue,
            isDeactivated, setIsDeactivated,
            isDeactivatedValue, setIsDeactivatedValue,
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

          }}>
            {children}
          </UserContext.Provider>
        </>
      )}
    </>
  )
}

export default UserProvider
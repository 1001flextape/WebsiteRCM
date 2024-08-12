// Libraries
import React, { useContext, useEffect, useState } from 'react'
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { useRouter } from 'next/router';
import { getUserRealTimeGraphQL } from '../store/getUserRealTime.store';
import { getSocketId } from '@/utils/realtime/socket';
import { getPermissionsForRoleGraphQL } from '../store/getPermissionsForRole.store';
import { postUserIsAdminGraphQL } from '../store/postAdmin.store';
import { enqueueSnackbar } from 'notistack';
import { postUserRoleGraphQL } from '../store/postPermission.store';
import { postUserIsCustomPermissionseGraphQL } from '../store/postCustomPermission.store';

export const UserContext = React.createContext();

export function UserProvider({ children }) {

  const { navigate } = useContext(AdminLayoutContext)

  // query params
  const router = useRouter();
  const { backendUserId } = router.query;

  const [isLoaded, setIsLoaded] = useState(false);
  const [entity, setEntity] = useState("")

  // application variables
  const [isRolesAndPermissionsShowing, setIsRolesAndPermissionsShowing] = useState(false)
  const [isPermissionsButtonsDisabled, setIsPermissionsButtonsDisabled] = useState(false)

  // non realtime props
  const [role, setRole] = useState([])
  const [roleValue, setRoleValue] = useState()
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
    if (backendUserId) {
      getUserRealTimeGraphQL({
        socketId: getSocketId(),
        id: backendUserId,
      }).then(response => {
        const roleList = response.data.backendRole_getMany
        const data = response.data.backendUser_getOneRealTime
        // Handle response
        setEntity(data.entity)
        setRole(data.role)
        setRoles(roleList.map(r => ({
          key: r.id,
          value: r.name,
        })))
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
        setIsRolesAndPermissionsShowing(!data.Admin)
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

  const onClickMediaManageInboxOnly = (booleanValue) => {
    if (booleanValue) {
      setIsMediaManagerRead(prevState => ({
        ...prevState,
        booleanValue: false
      }))
      setIsMediaManagerUpdate(prevState => ({
        ...prevState,
        booleanValue: false
      }))
      setIsMediaManagerDelete(prevState => ({
        ...prevState,
        booleanValue: false
      }))
    }
  }

  const onClickMediaManageRead = (booleanValue) => {
    if (booleanValue) {
      setIsMediaManagerInboxOnly(prevState => ({
        ...prevState,
        booleanValue: false
      }))
    }
  }

  const onClickMediaManageUpdate = (booleanValue) => {
    if (booleanValue) {
      setIsMediaManagerRead(prevState => ({
        ...prevState,
        booleanValue: true
      }))
      setIsMediaManagerInboxOnly(prevState => ({
        ...prevState,
        booleanValue: false
      }))
    }
  }

  const onClickMediaManageDelete = (booleanValue) => {
    if (booleanValue) {
      setIsMediaManagerRead(prevState => ({
        ...prevState,
        booleanValue: true
      }))
      setIsMediaManagerUpdate(prevState => ({
        ...prevState,
        booleanValue: true
      }))
      setIsMediaManagerInboxOnly(prevState => ({
        ...prevState,
        booleanValue: false
      }))
    }
  }


  const onClickSiteDesignerUpdate = (booleanValue) => {
    if (booleanValue) {
      setIsSiteDesignerRead(prevState => ({
        ...prevState,
        booleanValue: true
      }))
    }
  }

  const onClickSiteDesignerDelete = (booleanValue) => {
    if (booleanValue) {
      setIsSiteDesignerRead(prevState => ({
        ...prevState,
        booleanValue: true
      }))
      setIsSiteDesignerUpdate(prevState => ({
        ...prevState,
        booleanValue: true
      }))
    }
  }


  const onClickAdminUpdate = (booleanValue) => {
    if (booleanValue) {
      setIsAdminRead(prevState => ({
        ...prevState,
        booleanValue: true
      }))
    }
  }

  const onClickAdminDelete = (booleanValue) => {
    if (booleanValue) {
      setIsAdminRead(prevState => ({
        ...prevState,
        booleanValue: true
      }))
      setIsAdminUpdate(prevState => ({
        ...prevState,
        booleanValue: true
      }))
    }
  }






  const onClickUserManagementUpdate = (booleanValue) => {
    if (booleanValue) {
      setIsUserManagementRead(prevState => ({
        ...prevState,
        booleanValue: true
      }))
    }
  }

  const onClickUserManagementDelete = (booleanValue) => {
    if (booleanValue) {
      setIsUserManagementRead(prevState => ({
        ...prevState,
        booleanValue: true
      }))
      setIsUserManagementUpdate(prevState => ({
        ...prevState,
        booleanValue: true
      }))
    }
  }

  const changeRole = ({ roleId }) => {

    // if role is custom permissions
    if (roleId === "6c2886d4-c495-47b4-8d16-cbe1ff7c642f") {
      setIsPermissionsButtonsDisabled(false)

    } else {
      setIsPermissionsButtonsDisabled(true)

      getPermissionsForRoleGraphQL({
        roleId,
      }).then(response => {
        const data = response.data.backendRole_getPermissionsByRoleId.map(d => d.id)

        if (data.includes("2f30794d-3b68-42ed-bc02-4ac5a5cee91a")) {
          setIsDashboardRead(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsDashboardRead(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("f72294fb-c53e-4c6b-bcc4-c08aedd3695c")) {
          setIsMediaManagerInboxOnly(prevState => {

            return {
              ...prevState,
              booleanValue: true,
              user: null,
            }
          })
        } else {
          setIsMediaManagerInboxOnly(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("e3f48381-31d3-4463-9861-5420d761c6e9")) {
          setIsMediaManagerRead(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsMediaManagerRead(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("c5184ea7-ec8b-4bda-abf0-29266eb40a53")) {
          setIsMediaManagerUpdate(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsMediaManagerUpdate(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("bb7231a1-55d5-4655-8a72-2efef4e0b044")) {
          setIsMediaManagerDelete(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsMediaManagerDelete(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("cba2838f-0ad4-4853-8c90-d96de96a74a3")) {
          setIsSiteDesignerRead(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsSiteDesignerRead(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("30c4c4a8-f6cd-4233-8e30-502f9dcf0790")) {
          setIsSiteDesignerUpdate(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsSiteDesignerUpdate(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("d9e5f3b9-a5bf-4d2f-9275-288b56bf3811")) {
          setIsSiteDesignerDelete(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsSiteDesignerDelete(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("242feab-3e11-4cdf-92a6-0056e3cd2e32")) {
          setIsAdminRead(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsAdminRead(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("290b547b-77db-4817-aff0-b3c81d77e8d8")) {
          setIsAdminUpdate(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsAdminUpdate(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("0d85f1d5-01dd-4c2c-9316-996af2982b82")) {
          setIsAdminDelete(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsAdminDelete(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("5970d023-e224-4e4e-830b-b3993d402616")) {
          setIsUserManagementRead(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsUserManagementRead(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("438c338c-e478-40c5-8e7c-3987c88e0bcd")) {
          setIsUserManagementUpdate(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsUserManagementUpdate(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }

        if (data.includes("3df2f2c6-ef22-4226-96d6-be464da4f71a")) {
          setIsUserManagementDelete(prevState => ({
            ...prevState,
            booleanValue: true,
            user: null,
          }))
        } else {
          setIsUserManagementDelete(prevState => ({
            ...prevState,
            booleanValue: false,
            user: null,
          }))
        }



      })
    }
  }

  const save = () => {

    if (isAdminValue) {
      postUserIsAdminGraphQL({
        id: backendUserId,
        isAdmin: true
      }).then(response => {
        enqueueSnackbar("User Saved!")
      })
    } else if (!isAdminValue && roleValue !== "6c2886d4-c495-47b4-8d16-cbe1ff7c642f") {
      postUserRoleGraphQL({
        id: backendUserId,
        isAdmin: false,
        userRole: [{
          userId: backendUserId,
          roleId: roleValue,
        }]
      }).then(response => {
        enqueueSnackbar("User Saved!")
      })
    } else {
      const userPermissions = []

      if (isDashboardReadValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
        })
      }

      if (isMediaManagerInboxOnlyValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "f72294fb-c53e-4c6b-bcc4-c08aedd3695c",
        })
      }

      if (isMediaManagerReadValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "e3f48381-31d3-4463-9861-5420d761c6e9",
        })
      }

      if (isMediaManagerUpdateValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "c5184ea7-ec8b-4bda-abf0-29266eb40a53",
        })
      }

      if (isMediaManagerDeleteValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "bb7231a1-55d5-4655-8a72-2efef4e0b044",
        })
      }

      if (isSiteDesignerReadValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "cba2838f-0ad4-4853-8c90-d96de96a74a3",
        })
      }

      if (isSiteDesignerUpdateValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "30c4c4a8-f6cd-4233-8e30-502f9dcf0790",
        })
      }

      if (isSiteDesignerDeleteValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "d9e5f3b9-a5bf-4d2f-9275-288b56bf3811",
        })
      }

      if (isAdminReadValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "6242feab-3e11-4cdf-92a6-0056e3cd2e32",
        })
      }

      if (isAdminUpdateValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "290b547b-77db-4817-aff0-b3c81d77e8d8",
        })
      }

      if (isAdminDeleteValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "0d85f1d5-01dd-4c2c-9316-996af2982b82",
        })
      }

      if (isUserManagementReadValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "5970d023-e224-4e4e-830b-b3993d402616",
        })
      }

      if (isUserManagementUpdateValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "438c338c-e478-40c5-8e7c-3987c88e0bcd",
        })
      }

      if (isUserManagementDeleteValue) {
        userPermissions.push({
          userId: backendUserId,
          permissionId: "3df2f2c6-ef22-4226-96d6-be464da4f71a",
        })
      }


      postUserIsCustomPermissionseGraphQL({
        id: backendUserId,
        isAdmin: false,
        userRole: [{
          userId: backendUserId,
          roleId: "6c2886d4-c495-47b4-8d16-cbe1ff7c642f",
        }],
        userPermissions,
      }).then(response => {
        enqueueSnackbar("User Saved!")
      })
    }

  }


  return (

    <>
      {isLoaded && (
        <>
          <UserContext.Provider value={{
            entity, setEntity,
            email, setEmail,
            role, setRole,
            roleValue, setRoleValue,
            roles, setRoles,


            // application variables
            isRolesAndPermissionsShowing, setIsRolesAndPermissionsShowing,
            isPermissionsButtonsDisabled, setIsPermissionsButtonsDisabled,


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


            //functions
            changeRole,

            onClickMediaManageInboxOnly,
            onClickMediaManageRead,
            onClickMediaManageUpdate,
            onClickMediaManageDelete,
            onClickSiteDesignerUpdate,
            onClickSiteDesignerDelete,
            onClickAdminUpdate,
            onClickAdminDelete,
            onClickUserManagementUpdate,
            onClickUserManagementDelete,

            save,
          }}>
            {children}
          </UserContext.Provider>
        </>
      )}
    </>
  )
}

export default UserProvider
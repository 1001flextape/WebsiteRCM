// Libraries
import React, { useContext } from 'react'
import { createNewRoleGraphQL } from '../store/createNewRole.store';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

export const RoleContext = React.createContext();

export function RoleProvider({ children }) {
  const { navigate } = useContext(AdminLayoutContext)

  const [newRoleName, setNewRoleName] = React.useState("")

  const [role, setRole] = React.useState({

    // modals
    modal_isNewRoleModalOpened: false,
    modal_isDeleteRoleModalOpened: false,
  })

  const createRole = () => {
    if (newRoleName.length > 0) {
      createNewRoleGraphQL({
        name: newRoleName,
      }).then(response => {
        const data = response.data.backendRole_addOne

        navigate(`/portal/admin/user-management/roles/${data.id}`)
      })
    }
  }


  return (
    <RoleContext.Provider value={{
      role, setRole,
      newRoleName, setNewRoleName,
      createRole,

    }}>
      {children}
    </RoleContext.Provider>
  )
}

export default RoleProvider
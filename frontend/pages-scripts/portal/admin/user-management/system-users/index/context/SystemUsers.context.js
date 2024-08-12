// Libraries
import React, { useContext, useState } from 'react'
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { postNewBackendUsersGraphQL } from '../store/postNewUser.store';

export const UsersContext = React.createContext();

export function UsersProvider({ children }) {

  const { navigate } = useContext(AdminLayoutContext)

  const [modals, setModals] = useState({
    isNewUserModalOpen: false,
  })
  const [email, setEmail] = useState("")

  // const onCreateUser = ({ url }) => {
  //   postNewUserGraphQL({
  //     slug: url,
  //   }).then(response => {
  //     const data = response.data.backendSiteDesignerUser_addOne

  //     navigate(`/portal/site/pages/${data.id}`)

  //   })
  // }

  // const createUser = () => {
  //   if (slug.trim() !== '') {
  //     onCreateUser({
  //       url: `/p/${slug}`
  //     })

  //   }
  // }

  const createUser = () => {
    postNewBackendUsersGraphQL({
      email,
    }).then(response => {
      const data = response.data?.backendUser_addOne

      if (data?.id) {
        navigate(`/portal/admin/user-management/system-users/${data.id}`)
      }
    })
  }

  return (
    <UsersContext.Provider value={{
      modals, setModals,
      email, setEmail,

      createUser,
    }}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersProvider
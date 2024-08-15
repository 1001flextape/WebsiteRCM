// Libraries
import React, { useState } from 'react'

export const SiteDesignerDiscussionContext = React.createContext();

export function SiteDesignerDiscussionProvider({ children }) {

  const [siteDesignerDiscussion, setSiteDesignerDiscussion] = useState({

    //use for selecting items in drop downs
    selectedPostId: null,
    selectedCommentId: null,

    selectPostTitle: "",


    // ui
    posts: [],
    comments: [],

    // modals
    modal_isNewPostModalOpened: false,
    modal_isDeletePostModalOpened: false,
    modal_isEditPostModalOpened: false,
    modal_isEditCommentModalOpened: false,
    modal_isDeleteCommentModalOpened: false,

  })

  // modal inputs

  // post
  const [editPostModalId, setEditPostModalId] = useState("")
  const [editPostModalTitle, setEditPostModalTitle] = useState("")
  const [editPostModalMessage, setEditPostModalMessage] = useState("")
  const [deletePostModalId, setDeletePostModalId] = useState("")

  // commits
  const [editCommentModalId, setEditCommentModalId] = useState("")
  const [editCommentModalMessage, setEditCommentModalMessage] = useState("")
  const [deleteCommentModalId, setDeleteCommentModalId] = useState("")

  return (
    <SiteDesignerDiscussionContext.Provider value={{
      siteDesignerDiscussion, setSiteDesignerDiscussion,

      //post
      editPostModalId, setEditPostModalId,
      editPostModalTitle, setEditPostModalTitle,
      editPostModalMessage, setEditPostModalMessage,
      deletePostModalId, setDeletePostModalId,

      //comments
      editCommentModalId, setEditCommentModalId,
      editCommentModalMessage, setEditCommentModalMessage,
      deleteCommentModalId, setDeleteCommentModalId,


    }}>
      {children}
    </SiteDesignerDiscussionContext.Provider>
  )
}

export default SiteDesignerDiscussionProvider
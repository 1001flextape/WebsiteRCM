import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { postSiteDesignerDiscussion_updateOne_GraphQL } from '../store/DiscussionUpdate.store';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

//mui
import TextField from '@mui/material/TextField';
import { SiteDesignerDiscussionContext } from '../context/siteDesignerDiscussion.context';

// Dynamically import QuillEditor only when needed (on modal open)
const QuillEditor = dynamic(() => import('@/components/form/quill-editor/QuillEditor'), { ssr: false });

function EditPostModal({ isOpened, onClose, }) {
  const {
    siteDesignerDiscussion, setSiteDesignerDiscussion,

    //post
    editPostModalId, setEditPostModalId,
    editPostModalTitle, setEditPostModalTitle,
    editPostModalMessage, setEditPostModalMessage,
  } = useContext(SiteDesignerDiscussionContext);

  const [titleInput, setTitleInput] = useState(editPostModalTitle);
  const [postInput, setPostInput] = useState(editPostModalMessage);


  useEffect(() => {
    setTitleInput(editPostModalTitle)
  }, [editPostModalTitle])

  useEffect(() => {
    setPostInput(editPostModalMessage)
  }, [editPostModalMessage])

  const handleSubmit = (event) => {
    postSiteDesignerDiscussion_updateOne_GraphQL({
      id: editPostModalId,
      title: titleInput,
      post: postInput,
    });

    const newPosts = [...siteDesignerDiscussion.posts];
    for (let i = 0; i < newPosts.length; i++) {
      const postItem = newPosts[i];
      if (postItem.id === editPostModalId) {
        postItem.title = titleInput;
        postItem.post = postInput;
        postItem.hasBeenEdited = true;
        break;
      }
    }

    setSiteDesignerDiscussion(prevState => ({
      ...prevState,
      posts: newPosts,
    }));

    onClose(event);
  };

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Edit your post."
      onSubmit={handleSubmit}
      submitLabel={"Edit"}
    >
      <br />
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        fullWidth
        value={titleInput}
        onChange={(event) => setTitleInput(event.target.value)}
      />
      <br />
      <br />
      {/* Dynamically load QuillEditor when modal is opened */}
      {isOpened && (
        <QuillEditor
          onContentChange={(content) => setPostInput(content)}
          initialValue={postInput}
        />
      )}
      <br />
    </InformationModal>
  );
}

export default EditPostModal;

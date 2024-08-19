import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

// mine
import { postSiteDesignerDiscussion_updateOne_GraphQL } from '../store/DiscussionUpdate.store';
import { SiteDesignerDiscussionContext } from '../context/siteDesignerDiscussion.context';

// Dynamically import QuillEditor only when needed (on modal open)
const QuillEditor = dynamic(() => import('@/components/form/quill-editor/QuillEditor'), { ssr: false });

function EditPostModal({ isOpened, onClose }) {
  const {
    siteDesignerDiscussion, setSiteDesignerDiscussion,
    // post
    editPostModalId, setEditPostModalId,
    editPostModalTitle, setEditPostModalTitle,
    editPostModalMessage, setEditPostModalMessage,
  } = useContext(SiteDesignerDiscussionContext);

  const [titleInput, setTitleInput] = useState(editPostModalTitle);
  const [postInput, setPostInput] = useState(editPostModalMessage);

  useEffect(() => {
    setTitleInput(editPostModalTitle);
  }, [editPostModalTitle]);

  useEffect(() => {
    setPostInput(editPostModalMessage);
  }, [editPostModalMessage]);

  const handleSubmit = (event) => {
    postSiteDesignerDiscussion_updateOne_GraphQL({
      id: editPostModalId,
      title: titleInput,
      post: postInput,
    }).then(() => {
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
    }).catch((error) => {
      console.error('Error updating discussion:', error);
    });
  };

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        style: {
          padding: 0,
        }
      }}
    >
      <DialogTitle style={{ padding: '16px 24px' }}>
        Edit your post.
      </DialogTitle>

      <DialogContent style={{ padding: '20px', minWidth: "300px" }}>
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
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px' }}>
        <Button onClick={onClose} variant="outlined" style={{ marginRight: '8px' }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!titleInput || !postInput}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPostModal;

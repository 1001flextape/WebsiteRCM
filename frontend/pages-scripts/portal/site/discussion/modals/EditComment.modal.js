import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

// mine
import { postSiteDesignerDiscussionComment_updateOne_GraphQL } from '../store/DiscussionCommentUpdate.store';
import { SiteDesignerDiscussionContext } from '../context/siteDesignerDiscussion.context';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

// Dynamically import QuillEditor only when needed (on modal open)
const QuillEditor = dynamic(() => import('@/components/form/quill-editor/QuillEditor'), { ssr: false });

function EditCommentModal({ isOpened, onClose }) {
  const {
    siteDesignerDiscussion, setSiteDesignerDiscussion,
    // comments
    editCommentModalId, setEditCommentModalId,
    editCommentModalMessage, setEditCommentModalMessage,
  } = useContext(SiteDesignerDiscussionContext);

  const [postInput, setPostInput] = useState(editCommentModalMessage);

  const handleSubmit = (event) => {
    postSiteDesignerDiscussionComment_updateOne_GraphQL({
      post: postInput,
      id: editCommentModalId,
    }).then(() => {
      const newComments = [...siteDesignerDiscussion.comments];

      for (let i = 0; i < newComments.length; i++) {
        const comment = newComments[i];

        if (comment.id === siteDesignerDiscussion.selectedCommentId) {
          comment.post = postInput;
          comment.hasBeenEdited = true;
          break;
        }
      }

      setSiteDesignerDiscussion(prevState => ({
        ...prevState,
        comments: newComments,
      }));

      onClose(event);
    }).catch((error) => {
      console.error('Error updating comment:', error);
    });
  };

  useEffect(() => {
    if (siteDesignerDiscussion.selectedCommentId) {
      for (let i = 0; i < siteDesignerDiscussion.comments.length; i++) {
        const comment = siteDesignerDiscussion.comments[i];
        if (comment.id === siteDesignerDiscussion.selectedCommentId) {
          setPostInput(comment.post);
          break;
        }
      }
    }
  }, [siteDesignerDiscussion]);

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
        Edit your comment.
      </DialogTitle>

      <DialogContent style={{ padding: '20px', minWidth: "300px" }}>
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
        <Button onClick={handleSubmit} variant="contained" disabled={!postInput}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCommentModal;

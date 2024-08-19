import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

// mine
import { enqueueSnackbar } from 'notistack';
import { SiteDesignerDiscussionContext } from '../context/siteDesignerDiscussion.context';
import { postSiteDesignerDiscussionComment_deleteOne_GraphQL } from '../store/DiscussionCommentDelete.store';

function DeleteCommentModal({ isOpened, onClose }) {
  const router = useRouter();
  const {
    siteDesignerDiscussion, setSiteDesignerDiscussion,
    deleteCommentModalId, setDeleteCommentModalId,
  } = useContext(SiteDesignerDiscussionContext);

  const [post, setPost] = useState("");

  const handleSubmit = (event) => {
    postSiteDesignerDiscussionComment_deleteOne_GraphQL({
      id: deleteCommentModalId,
    }).then(result => {
      if (result.errors === undefined) {
        const newComments = [...siteDesignerDiscussion.comments];

        for (let i = 0; i < newComments.length; i++) {
          const comment = newComments[i];

          if (comment.id === siteDesignerDiscussion.selectedCommentId) {
            newComments.splice(i, 1);

            setSiteDesignerDiscussion(prevState => ({
              ...prevState,
              comments: newComments,
            }));
            break;
          }
        }

        enqueueSnackbar("Comment deleted.");
      } else {
        enqueueSnackbar("COMMENT DID NOT DELETE. Please message IT.");
      }
    }).catch((error) => {
      enqueueSnackbar("An error occurred while deleting the comment.");
      console.error('Error deleting comment:', error);
    });
    onClose(event);
  };

  useEffect(() => {
    if (siteDesignerDiscussion.selectedCommentId) {
      for (let i = 0; i < siteDesignerDiscussion.comments.length; i++) {
        const comment = siteDesignerDiscussion.comments[i];

        if (comment.id === siteDesignerDiscussion.selectedCommentId) {
          setPost(comment.post);
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
      <DialogTitle style={{ padding: '16px 24px', background: '#f44336', color: "#f1f4f5" }}>
        Delete Comment
      </DialogTitle>

      <DialogContent style={{ padding: '20px', minWidth: "300px", borderBottom: "2px solid #dbdbdb" }}>
        <Typography variant="body1" color="textSecondary">
          Would you like to delete this comment?
        </Typography>
      </DialogContent>

      <DialogContent style={{ padding: '20px', minWidth: "300px" }}>
        <div
          className={`discussion-post`}
          dangerouslySetInnerHTML={{ __html: post }}
          style={{ marginTop: '4px' }}
        />
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px', borderTop: "2px solid #dbdbdb" }}>
        <Button onClick={onClose} variant="outlined" style={{ marginRight: '8px' }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="error" disabled={!deleteCommentModalId}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteCommentModal;

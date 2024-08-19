import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

// mine
import { enqueueSnackbar } from 'notistack';
import { SiteDesignerDiscussionContext } from '../context/siteDesignerDiscussion.context';
import { postSiteDesignerDiscussion_deleteOne_GraphQL } from '../store/DiscussionDelete.store';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { realtimeLink } from '@/utils/realtime/link';

function DeletePostModal({ isOpened, onClose }) {
  const router = useRouter();
  const {
    siteDesignerDiscussion, setSiteDesignerDiscussion,
    deletePostModalId, setDeletePostModalId
  } = useContext(SiteDesignerDiscussionContext);
  const { setTabs, idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext);

  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const handleSubmit = (event) => {
    postSiteDesignerDiscussion_deleteOne_GraphQL({
      id: deletePostModalId,
    }).then(result => {
      if (result.errors === undefined) {
        const newPosts = [...siteDesignerDiscussion.posts];

        for (let i = 0; i < newPosts.length; i++) {
          const post = newPosts[i];

          if (post.id === siteDesignerDiscussion.selectedPostId) {
            newPosts.splice(i, 1);

            setSiteDesignerDiscussion(prevState => ({
              ...prevState,
              posts: newPosts
            }));
            break;
          }
        }

        enqueueSnackbar("Discussion deleted.");
        navigateToDiscussions();

      } else {
        enqueueSnackbar("DISCUSSION DID NOT DELETE! Please message IT.");
      }
    }).catch((error) => {
      enqueueSnackbar("An error occurred while deleting the discussion.");
      console.error('Error deleting discussion:', error);
    });
    onClose(event);
  };

  const navigateToDiscussions = () => {
    realtimeLink({
      to: `/portal/site/discussion/`,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    });
  };

  useEffect(() => {
    if (siteDesignerDiscussion.selectedPostId) {
      for (let i = 0; i < siteDesignerDiscussion.posts.length; i++) {
        const post = siteDesignerDiscussion.posts[i];

        if (post.id === siteDesignerDiscussion.selectedPostId) {
          setPost(post.post);
          setTitle(post.title);
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
        Delete this discussion.
      </DialogTitle>

      <DialogContent style={{ padding: '20px', minWidth: "300px", borderBottom: "2px solid #dbdbdb" }}>
        <Typography variant="body1" color="textSecondary">
          Would you like to delete this discussion?
        </Typography>
      </DialogContent>

      <DialogContent style={{ padding: '20px', minWidth: "300px" }}>
        <Typography variant="h6">
          {title}
        </Typography>
        <div
          className={`discussion-post`}
          dangerouslySetInnerHTML={{ __html: post }}
          style={{ marginTop: '4px' }}
        />
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px', borderTop: "2px solid #dbdbdb" }}>
        <Button onClick={onClose} variant="outlined" style={{ marginRight: '8px' }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="error" disabled={!deletePostModalId}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeletePostModal;

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { postSiteDesignerDiscussion_addOne_GraphQL } from '../store/DiscussionAdd.store';

// Dynamically import QuillEditor only when needed (on modal open)
const QuillEditor = dynamic(() => import('@/components/form/quill-editor/QuillEditor'), { ssr: false });

function NewPostModal({ isOpened, onClose }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');

  const handleSubmit = (event) => {
    postSiteDesignerDiscussion_addOne_GraphQL({
      post,
      title,
    }).then((result) => {
      const newConvo = result.data.backendSiteDesignerDiscussion_addOne;
      router.push(`/portal/site/discussion/${newConvo.id}`);
    }).catch((error) => {
      console.error('Error posting discussion:', error);
    });
    onClose(event);
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
        Create a new post.
      </DialogTitle>

      <DialogContent style={{ padding: '20px', minWidth: "300px" }}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <br />
        {isOpened && (
          <QuillEditor onContentChange={(content) => setPost(content)} />
        )}
        <br />
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px' }}>
        <Button onClick={onClose} variant="outlined" style={{ marginRight: '8px' }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title || !post}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewPostModal;

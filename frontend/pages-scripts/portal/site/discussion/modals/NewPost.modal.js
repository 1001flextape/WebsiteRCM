// NewPostModal.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import InformationModal from '@/components/modals/Information.modal';
import { postSiteDesignerDiscussion_addOne_GraphQL } from '../store/DiscussionAdd.store';
import TextField from '@mui/material/TextField';
// import QuillEditor from '@/components/form/quill-editor/QuillEditor';

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
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Create a new post."
      onSubmit={handleSubmit}
      submitLabel="Create"
    >
      <br />
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
    </InformationModal>
  );
}

export default NewPostModal;

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { postSiteDesignerDiscussionComment_updateOne_GraphQL } from '../store/DiscussionCommentUpdate.store';

//mui
import TextField from '@mui/material/TextField';
import { SiteDesignerDiscussionContext } from '../context/siteDesignerDiscussion.context';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

// Dynamically import QuillEditor only when needed (on modal open)
const QuillEditor = dynamic(() => import('@/components/form/quill-editor/QuillEditor'), { ssr: false });

function EditCommentModal({ isOpened, onClose }) {
  const { idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext);
  const {
    siteDesignerDiscussion, setSiteDesignerDiscussion,

    //comments
    editCommentModalId, setEditCommentModalId,
    editCommentModalMessage, setEditCommentModalMessage,
  } = useContext(SiteDesignerDiscussionContext);

  const router = useRouter();

  const [postInput, setPostInput] = useState(editCommentModalMessage);

  const handleSubmit = (event) => {
    postSiteDesignerDiscussionComment_updateOne_GraphQL({
      post: postInput,
      id: editCommentModalId,
    });

    const newComments = [...siteDesignerDiscussion.comments];

    for (let i = 0; i < newComments.length; i++) {
      const comment = newComments[i];

      if (comment.id === siteDesignerDiscussion.selectedCommentId) {
        comment.post = postInput;
        comment.hasBeenEdited = true;
        break;
      }
    }

    setSiteDesignerDiscussion((prevState) => ({
      ...prevState,
      comments: newComments,
    }));

    onClose(event);
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
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Edit your comment."
      onSubmit={handleSubmit}
      submitLabel={"Edit"}
    >
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

export default EditCommentModal;

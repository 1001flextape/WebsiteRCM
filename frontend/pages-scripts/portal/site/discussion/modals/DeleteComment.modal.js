import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';
import { postSiteDesignerDiscussionComment_deleteOne_GraphQL } from '../store/DiscussionCommentDelete.store';
import { enqueueSnackbar } from 'notistack';
import { SiteDesignerDiscussionContext } from '../context/siteDesignerDiscussion.context';

function DeleteCommentModal({ isOpened, onClose }) {
  const router = useRouter();
  const {
    siteDesignerDiscussion, setSiteDesignerDiscussion,

    //comments
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
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Delete Comment"
      onSubmit={handleSubmit}
      submitLabel={"Delete"}
    >
      <br />
      <p>Would you like to delete this comment?</p>
      <br />
      {/* Render the comment post as HTML */}
      <div
        className={`discussion-post`}
        dangerouslySetInnerHTML={{ __html: post }}
      />
      <br />
    </InformationModal>
  );
}

export default DeleteCommentModal;

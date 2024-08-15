'use client'

//Library
import React, { useContext, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'

// Mine
import tabsJson from '@/pages-scripts/portal/site/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import InputCard from '@/pages-scripts/portal/site/discussion/components/input.card';

// MUI
import Box from '@mui/material/Box';

// Icons
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { getSiteDesignerDiscussion_getOneById_GraphQL } from '@/pages-scripts/portal/site/discussion/store/DiscussionGetOneById.store';
import SiteDesignerDiscussionProvider, { SiteDesignerDiscussionContext } from '@/pages-scripts/portal/site/discussion/context/siteDesignerDiscussion.context';
import PostCard from '@/pages-scripts/portal/site/discussion/components/post.card';
import { useTheme } from '@mui/material';
import DeletePostModal from '@/pages-scripts/portal/site/discussion/modals/DeletePost.modal';
import DeleteCommentModal from '@/pages-scripts/portal/site/discussion/modals/DeleteComment.modal';
import EditCommentModal from '@/pages-scripts/portal/site/discussion/modals/EditComment.modal';
import EditPostModal from '@/pages-scripts/portal/site/discussion/modals/EditPost.modal';


const DiscussionPage = () => {
  const router = useRouter()
  const theme = useTheme()
  const { setTabs, idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)

  const { siteDesignerDiscussion, setSiteDesignerDiscussion } = useContext(SiteDesignerDiscussionContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const initData = ({ id }) => {
    getSiteDesignerDiscussion_getOneById_GraphQL({
      id,
      page: 0,
      pageSize: 25,
    }).then(result => {
      console.log('result2', result)
      const post = result.data.backendSiteDesignerDiscussion_getOneById
      const comments = result.data?.backendSiteDesignerDiscussionComment_getManyWithPagination?.rows || []
      console.log('comments', comments)
      setSiteDesignerDiscussion(prevState => ({
        ...prevState,
        posts: [post],
        comments,
      }))

      setIsLoaded(true)
    })
  }

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 0,
    }))

    console.log('router.query?.postId', router.query?.postId)
    if (router.query?.postId) {
      initData({ id: router.query.postId })
    }

  }, [router.query])

  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}>
      {isLoaded && (
        <>

          <Link
            href="/portal/site/discussion/"
            style={{ color: theme.palette.grey[700] }}
          >

            <Box
              sx={{
                flexGrow: 3,
              }}>
              <FastRewindIcon sx={{ m: "10px 2px 10px 0" }} />
              <span
                style={{
                  display: "ruby-text-container",
                }}
              >
                Back
              </span>
            </Box>
          </Link>
          {siteDesignerDiscussion.posts.length !== 0 && siteDesignerDiscussion.posts.map(p => (
            <PostCard
              key={p.id}
              commentsCount={p.commentsCount}
              createdAt={p.createdAt}
              hasBeenEdited={p.hasBeenEdited}
              id={p.id}
              myVote={p.myVote}
              post={p.post}
              title={p.title}
              user={p.user}
              voteTotal={parseInt(p.voteTotal) || 0}
            />
          ))}

          {siteDesignerDiscussion.posts.length !== 0 && (
            <>
              {siteDesignerDiscussion.comments.length !== 0 && siteDesignerDiscussion.comments.map(c => {
                console.log('c', c)
                return (
                  <PostCard
                    key={c.id}
                    commentsCount={c.commentsCount}
                    createdAt={c.createdAt}
                    hasBeenEdited={c.hasBeenEdited}
                    id={c.id}
                    myVote={c.myVote}
                    post={c.post}
                    title={c.title}
                    user={c.user}
                    voteTotal={parseInt(c.voteTotal) || 0}
                    isCommentModeOn
                  />
                )
              })}
            </>
          )}
          <br />
          <InputCard />
        </>
      )}









      <EditPostModal
        isOpened={siteDesignerDiscussion.modal_isEditPostModalOpened}
        onClose={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setSiteDesignerDiscussion(prevState => ({
            ...prevState,
            modal_isEditPostModalOpened: false,
          }))
        }}

      />

      <EditCommentModal
        isOpened={siteDesignerDiscussion.modal_isEditCommentModalOpened}
        onClose={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setSiteDesignerDiscussion(prevState => ({
            ...prevState,
            modal_isEditCommentModalOpened: false,
          }))
        }}

      />

      <DeleteCommentModal
        isOpened={siteDesignerDiscussion.modal_isDeleteCommentModalOpened}
        onClose={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setSiteDesignerDiscussion(prevState => ({
            ...prevState,
            modal_isDeleteCommentModalOpened: false,
          }))
        }}

      />

      <DeletePostModal
        isOpened={siteDesignerDiscussion.modal_isDeletePostModalOpened}
        onClose={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setSiteDesignerDiscussion(prevState => ({
            ...prevState,
            modal_isDeletePostModalOpened: false,
          }))
        }}
      />
    </Box>
  )
}

DiscussionPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <SiteDesignerDiscussionProvider>
        {page}
      </SiteDesignerDiscussionProvider>
    </AdminLayout>
  )
}

export default DiscussionPage
'use client'

// Library
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import moment from 'moment';

// Mine
import AdminLayout from '@/layouts/admin/layout';
import { realtimeLink } from '@/utils/realtime/link';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { getMediaManagerFileByIdGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getFileById.store';
import { getMediaManagerUserChipGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getUserChip.store';
import { getMediaManagerBreadCrumbsGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-breadCrumbs.store';
import UserChip from '@/components/chip/user.chip';
import MediaManagerProvider, { MediaManagerContext } from '@/pages-scripts/portal/media-manager/context/mediaManager.context';

// MUI
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import RestoreFileModal from '@/pages-scripts/portal/media-manager/modals/RestoreFile.modal';
import { Breadcrumbs } from '@mui/material';

const MediaManager = () => {
  const router = useRouter()
  const { idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext)

  const [isLoaded, setIsLoaded] = useState(false)
  const [file, setFile] = useState({})
  const [uploadedUser, setUploadedUser] = useState({})
  const [deletedByUser, setDeleteByUser] = useState({})
  const [breadCrumbs, setBreadCrumbs] = useState([])

  const loadData = ({ id }) => {
    getMediaManagerFileByIdGraphQL({ id }).then(result => {
      const targetFile = result.data.backendMediaManagerFile_getOneById
      setFile(targetFile)

      if (targetFile.folderId) {
        getMediaManagerBreadCrumbsGraphQL({ folderId: targetFile.folderId }).then(breadResult => {
          let newBreadCrumbs = breadResult.data?.backendMediaManagerFolder_getBreadCrumb || []
          newBreadCrumbs = newBreadCrumbs.sort((a, b) => b.order - a.order)
          setBreadCrumbs(newBreadCrumbs)
        })
      }

      getMediaManagerUserChipGraphQL({ id: targetFile.uploadedBy }).then(uploadUserResult => {
        const uploadUser = uploadUserResult.data.backendUserBasicView_them
        setUploadedUser(uploadUser)

        if (targetFile.deletedAt) {
          getMediaManagerUserChipGraphQL({ id: targetFile.deletedBy }).then(deletedByResult => {
            const deletedUser = deletedByResult.data.backendUserBasicView_them
            setDeleteByUser(deletedUser)
            setIsLoaded(true)
          })
        } else {
          setIsLoaded(true)
        }
      })
    })
  }

  useEffect(() => {
    if (router.query?.id) {
      loadData({ id: router.query.id })
    }
  }, [router.query])

  useEffect(() => {
    if (isLoaded && mediaManager.selectedFileId === null) {
      loadData({ id: router.query.id })
    }
  }, [mediaManager, isLoaded])

  const navigateToMediaManager = () => {
    realtimeLink({
      to: `/portal/media-manager`,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    })
  }

  const navigateFolder = ({ id }) => {
    realtimeLink({
      to: `/portal/media-manager/folder/${id}`,
      meetingId: panelMeetingDoc.id,
      leaderUserId: panelMeetingDoc.leader?.id,
      router,
      setPanelMeetingDoc,
      userId: idChip.id,
    })
  }

  const openRestoreFile = () => {
    setMediaManager(prevState => ({
      ...prevState,
      modal_isRestoreFileModalOpened: true,
      selectFileName: file.userFileName,
      selectedFileId: router.query.id,
    }))
  }

  return (
    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto",
      minHeight: "350px",
    }}>

      {isLoaded && (
        <>
          <Grid container sx={{ mb: 2, alignItems: 'center' }}>
            {breadCrumbs.length !== 0 && (
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  sx={{ lineHeight: "50px", cursor: "pointer" }}
                  underline="hover"
                  color="inherit"
                  onClick={() => navigateToMediaManager()}
                >
                  Media Manager
                </Link>
                {breadCrumbs.map(b => (
                  <Link
                    key={b.id}
                    sx={{ lineHeight: "50px", cursor: "pointer" }}
                    underline="hover"
                    color="inherit"
                    onClick={() => navigateFolder({ id: b.id })}
                  >
                    {b.name}
                  </Link>
                ))}
              </Breadcrumbs>
            )}
          </Grid>

          <Paper elevation={3} sx={{
            borderRadius: "8px 8px 0 0",
          }}>
            {/* <Grid container spacing={2} sx={{ p: 5 }}> */}
            <Grid container xs={12} sx={{ p: 5 }}>
              <img
                src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${file.url}`}
                style={{ width: "100%", border: `3px solid #7d7d7d` }}
              />

              {file.deletedAt && (
                <>
                  <p><strong>This file is in the trash folder</strong></p>
                  <br />
                </>
              )}
              {/* Table-like layout for fields */}
            </Grid>
            {/* </Grid> */}
          </Paper>

          {file.deletedAt && (
            <>
              <Paper elevation={3} sx={{ borderRadius: "8px" }}> {/* Wrapper for deleted section */}
                <Grid container sx={{ p: 0, borderTop: "2px solid #d3d3d3" }}> {/* Top border */}

                  {/* First Row - Deleted On */}
                  <Grid container sx={{ borderBottom: "2px solid #d3d3d3" }}> {/* Bottom border */}
                    <Grid item xs={3} sx={{ backgroundColor: "#ffcccc", padding: "8px" }}> {/* Smaller key column with red background */}
                      <strong>Deleted On</strong>
                    </Grid>
                    <Grid item xs={9} sx={{ padding: "8px" }}>
                      {moment(parseInt(file.deletedAt)).toLocaleString()}
                    </Grid>
                  </Grid>

                  {/* Second Row - Deleted By */}
                  <Grid container sx={{ borderBottom: "2px solid #d3d3d3" }}> {/* Bottom border */}
                    <Grid item xs={3} sx={{ backgroundColor: "#ffcccc", padding: "8px" }}> {/* Smaller key column with red background */}
                      <strong>Deleted By</strong>
                    </Grid>
                    <Grid item xs={9} sx={{ padding: "8px" }}>
                      <UserChip
                        callByType={deletedByUser.callByType}
                        circleColor={deletedByUser.circleColor}
                        email={deletedByUser.email}
                        firstName={deletedByUser.firstName}
                        labelColor={deletedByUser.labelColor}
                        lastName={deletedByUser.lastName}
                        username={deletedByUser.username}
                        picturePreview={deletedByUser.picture}
                      />
                    </Grid>
                  </Grid>

                  {/* Third Row - Restore */}
                  <Grid container>
                    <Grid item xs={3} sx={{ backgroundColor: "#ffcccc", padding: "8px" }}> {/* Smaller key column with red background */}
                      <strong>Restore</strong>
                    </Grid>
                    <Grid item xs={9} sx={{ padding: "8px" }}>
                      <Button variant="contained" color="info" onClick={() => openRestoreFile()}>
                        Restore File
                      </Button>
                    </Grid>
                  </Grid>

                </Grid>
              </Paper>
            </>
          )}
          <Paper elevation={3} sx={{ borderRadius: "0 0 8px 8px" }}> {/* No radius on top */}
            <Grid container sx={{ p: 0, borderTop: "2px solid #d3d3d3" }}> {/* Top border */}

              {/* First Row */}
              <Grid container sx={{ borderBottom: "2px solid #d3d3d3" }}> {/* Bottom border */}
                <Grid item xs={3} sx={{ backgroundColor: "#f4f4f4", padding: "8px" }}> {/* Smaller key column */}
                  <strong>Name</strong>
                </Grid>
                <Grid item xs={9} sx={{ padding: "8px" }}>
                  {file.userFileName}
                </Grid>
              </Grid>

              {/* Second Row */}
              <Grid container sx={{ borderBottom: "2px solid #d3d3d3" }}> {/* Bottom border */}
                <Grid item xs={3} sx={{ backgroundColor: "#f4f4f4", padding: "8px" }}> {/* Smaller key column */}
                  <strong>Location</strong>
                </Grid>
                <Grid item xs={9} sx={{ padding: "8px" }}>
                  <Link sx={{ cursor: "pointer" }} underline="hover" color="inherit" onClick={() => navigateToMediaManager()}>
                    Media Manager
                  </Link>
                </Grid>
              </Grid>

              {/* Third Row */}
              <Grid container sx={{ borderBottom: "2px solid #d3d3d3" }}> {/* Bottom border */}
                <Grid item xs={3} sx={{ backgroundColor: "#f4f4f4", padding: "8px" }}> {/* Smaller key column */}
                  <strong>Uploaded On</strong>
                </Grid>
                <Grid item xs={9} sx={{ padding: "8px" }}>
                  {moment(parseInt(file.createdAt)).toLocaleString()}
                </Grid>
              </Grid>

              {/* Fourth Row */}
              <Grid container>
                <Grid item xs={3} sx={{ backgroundColor: "#f4f4f4", padding: "8px" }}> {/* Smaller key column */}
                  <strong>Uploaded By</strong>
                </Grid>
                <Grid item xs={9} sx={{ padding: "8px" }}>
                  <UserChip
                    callByType={uploadedUser.callByType}
                    circleColor={uploadedUser.circleColor}
                    email={uploadedUser.email}
                    firstName={uploadedUser.firstName}
                    labelColor={uploadedUser.labelColor}
                    lastName={uploadedUser.lastName}
                    username={uploadedUser.username}
                    picturePreview={uploadedUser.picture}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <RestoreFileModal
            isOpened={mediaManager.modal_isRestoreFileModalOpened}
            onClose={() => {
              setMediaManager(prevState => ({
                ...prevState,
                modal_isRestoreFileModalOpened: false,
                selectedFileId: null,
              }))
            }}
          />
        </>
      )}
    </Box>
  )
}

MediaManager.getLayout = function getLayout(page) {
  return (
    <AdminLayout hasNoEntity>
      <MediaManagerProvider>{page}</MediaManagerProvider>
    </AdminLayout>
  )
}

export default MediaManager

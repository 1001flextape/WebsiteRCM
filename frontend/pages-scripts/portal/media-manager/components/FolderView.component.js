'use client'

// Library
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// Mine
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { MediaManagerContext } from '@/pages-scripts/portal/media-manager/context/mediaManager.context';
import { getMediaManagerPageGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getPage.store';
import NewFolderModal from '@/pages-scripts/portal/media-manager/modals/NewFolder.modal';
import RenameFolderModal from '@/pages-scripts/portal/media-manager/modals/RenameFolder.modal';
import DeleteFolderModal from '@/pages-scripts/portal/media-manager/modals/DeleteFolder.modal';
import DeleteFileModal from '@/pages-scripts/portal/media-manager/modals/DeleteFile.modal';
import RenameFileModal from '@/pages-scripts/portal/media-manager/modals/RenameFile.modal';
import { getMediaManagerBreadCrumbsGraphQL } from '../store/mediaManager-breadCrumbs.store';
import DeleteFolderFailedModal from '../modals/DeleteFolderFailed.modal';

// MUI
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

//icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ImageIcon from '@mui/icons-material/Image';
import uploaderUtil from '@/utils/uploader/callUploaderApi';
import MoveFileModal from '../modals/MoveFile.modal';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const menuItem = {
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgb(224, 224, 224)"
  }
}

const FolderView = () => {
  const router = useRouter()
  const {
    setTabs,
    navigate,
  } = useContext(AdminLayoutContext)
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext)

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false)
  const [dropDowns, setDropDowns] = useState({})

  const [breadCrumbs, setBreadCrumbs] = useState([])

  useEffect(() => {

    setTabs(prevState => ({
      ...prevState,
      tabs: []
    }))
    setMediaManager(prevState => ({
      ...prevState,
      selectedFolderId: null,
      folders: [],
      files: [],
    }))

    getMediaManagerPageGraphQL({
      folderId: router.query?.id,
    }).then(result => {
      const foldersFromServer = result.data.backendMediaManagerFolder_getMany
      const filesFromServer = result.data.backendMediaManagerFile_getMany

      setMediaManager(prevState => ({
        ...prevState,
        folders: foldersFromServer,
        files: filesFromServer,
      }))

      const newDropDown = {}
      foldersFromServer.map(f => {
        newDropDown[f.id] = false
      })
      filesFromServer.map(f => {
        newDropDown[f.id] = false
      })

      setDropDowns(newDropDown)
      setIsLoaded(true)
    })

    if (router.query?.id) {
      getMediaManagerBreadCrumbsGraphQL({
        folderId: router.query.id
      }).then(result => {

        let newBreadCrumbs = result.data?.backendMediaManagerFolder_getBreadCrumb || []
        newBreadCrumbs = newBreadCrumbs.sort((a, b) => b.order - a.order)
        setBreadCrumbs(newBreadCrumbs)

      })
    }


  }, [router.query])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigateToMediaManager = () => {
    navigate(`/portal/media-manager`)
  }

  const navigateFile = ({ id }) => {
    navigate(`/portal/media-manager/detail/${id}`)
  }

  const navigateFolder = ({ id }) => {
    navigate(`/portal/media-manager/folder/${id}`)
  }

  const navigateToTrashFolder = () => {
    navigate(`/portal/media-manager/trash`)
  }

  const handleNewFolder = () => {
    setMediaManager(prevState => ({
      ...prevState,
      modal_isNewFolderModalOpened: true,
    }))
    handleClose()
  }

  const handleUploader = () => {
    setMediaManager(prevState => ({
      ...prevState,
      modal_isUploadFileModalOpened: true,
    }))
    handleClose()
  }

  const handleRenameFolderOpen = ({ event, id, name }) => {
    event.preventDefault();
    event.stopPropagation();

    setMediaManager(prevState => ({
      ...prevState,
      modal_isRenameFolderModalOpened: true,
      selectFolderName: name,
      selectedFolderId: id,
    }))

    handleCloseDropDown({ event, id })
  }

  const handleRenameFileOpen = ({ event, id, name }) => {
    event.preventDefault();
    event.stopPropagation();

    setMediaManager(prevState => ({
      ...prevState,
      modal_isRenameFileModalOpened: true,
      selectFileName: name,
      selectedFileId: id,
    }))

    handleCloseDropDown({ event, id })
  }
  const handleDeleteFolderOpen = ({ event, id, name }) => {
    event.preventDefault();
    event.stopPropagation();

    setMediaManager(prevState => ({
      ...prevState,
      modal_isDeleteFolderModalOpened: true,
      selectFolderName: name,
      selectedFolderId: id,
    }))

    handleCloseDropDown({ event, id })
  }

  const handleDeleteFileOpen = ({ event, id, name }) => {
    event.preventDefault();
    event.stopPropagation();

    setMediaManager(prevState => ({
      ...prevState,
      modal_isDeleteFileModalOpened: true,
      selectFileName: name,
      selectedFileId: id,
    }))

    handleCloseDropDown({ event, id })
  }

  const handleMoveFileOpen = ({ event, id, name }) => {
    event.preventDefault();
    event.stopPropagation();

    setMediaManager(prevState => ({
      ...prevState,
      modal_isMoveFileModalOpened: true,
      selectFileName: name,
      selectedFileId: id,
    }));

    handleCloseDropDown({ event, id });
  };

  const handleOpenDropDown = ({ event, id }) => {
    event.preventDefault();
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
    setDropDowns(prevState => {
      const newDropDown = { ...prevState }

      newDropDown[id] = true

      return newDropDown
    })
  }

  const handleCloseDropDown = ({ event, id }) => {
    event.preventDefault();
    event.stopPropagation();
    setDropDowns(prevState => {
      const newDropDown = { ...prevState }

      newDropDown[id] = false

      return newDropDown
    })
  }

  const handleFileUpload = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Handle file upload logic here
        console.log('Selected file:', file);


        uploaderUtil.postMediaManager({
          file,
          folderId: router.query?.id,
        }).then(() => {

          getMediaManagerPageGraphQL({
            folderId: router.query?.id,
          }).then(result => {
            const foldersFromServer = result.data.backendMediaManagerFolder_getMany
            const filesFromServer = result.data.backendMediaManagerFile_getMany

            setMediaManager(prevState => ({
              ...prevState,
              files: filesFromServer,
              folders: foldersFromServer
            }))
          })
        })
      }
    }
    inputElement.click(); // This opens the system's file explorer
    handleClose();
  };


  return (
    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto",
      padding: "20px",
      minHeight: "350px",
    }}>
      {isLoaded && (
        <>
          <Grid container spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
            <Grid item xs={6}>
              {/* Breadcrumb on the left */}
              {breadCrumbs.length === 0 && (
                <Breadcrumbs aria-label="breadcrumb">
                  <Typography
                    sx={{ lineHeight: "50px", cursor: "pointer" }}
                    color="text.primary"
                  >
                    Media Manager
                  </Typography>
                </Breadcrumbs>
              )}

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
                  {breadCrumbs.map((b) => (
                    <Link
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

            <Grid item xs={6}>
              {/* Buttons on the right */}
              <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
                <Button variant="contained" color="error" onClick={() => navigateToTrashFolder()}>
                  View Trash
                </Button>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="containedWhite"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  New
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleNewFolder}>
                    <FolderIcon />
                    Folder
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleFileUpload}>
                    <FileUploadIcon />
                    Upload File
                  </MenuItem>
                </StyledMenu>
              </Stack>
            </Grid>
          </Grid>

          <br />
          <Paper elevation={3}>


            <Grid container spacing={2}>
              <Grid item xs={12}>
                {isLoaded && mediaManager.folders.length === 0 && mediaManager.files.length === 0 && (
                  <p style={{ textAlign: "center" }}>
                    <em>
                      Nothing here
                    </em>
                    <br />
                    <br />
                  </p>
                )}
                {isLoaded && (mediaManager.folders.length !== 0 || mediaManager.files.length !== 0) && (
                  <List dense={false}>
                    {mediaManager.folders.map(f => (
                      <div key={f.id}>
                        <ListItem
                          sx={menuItem}
                          onClick={() => navigateFolder({ id: f.id })}
                          secondaryAction={
                            <>
                              <IconButton
                                onClick={(event) => handleOpenDropDown({ event, id: f.id })}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                  'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={dropDowns[f.id]}
                                onClose={(event) => handleCloseDropDown({ event, id: f.id })}
                              >
                                <MenuItem onClick={() => navigateFolder({ id: f.id })}>
                                  Open
                                </MenuItem>
                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem onClick={(event) => handleRenameFolderOpen({ event, id: f.id, name: f.name })}>
                                  Rename
                                </MenuItem>
                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem onClick={(event) => handleDeleteFolderOpen({ event, id: f.id, name: f.name })}>
                                  Delete
                                </MenuItem>
                              </StyledMenu>
                            </>
                          }
                        >
                          <ListItemIcon>
                            <FolderIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={f.name}
                          />
                        </ListItem>

                        <Divider />
                      </div>
                    ))}
                    {mediaManager.files.map(f => (
                      <div key={f.id}>
                        <ListItem
                          sx={menuItem}
                          onClick={() => navigateFile({ id: f.id })}
                          secondaryAction={
                            <>
                              <IconButton
                                onClick={(event) => handleOpenDropDown({ event, id: f.id })}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                  'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={dropDowns[f.id]}
                                onClose={(event) => handleCloseDropDown({ event, id: f.id })}
                              >
                                <MenuItem onClick={() => navigateFile({ id: f.id })}>
                                  Open
                                </MenuItem>
                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem onClick={(event) => handleRenameFileOpen({ event, id: f.id, name: f.userFileName })}>
                                  Rename
                                </MenuItem>
                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem onClick={(event) => handleMoveFileOpen({ event, id: f.id, name: f.userFileName })}>
                                  Move File
                                </MenuItem>
                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem onClick={(event) => handleDeleteFileOpen({ event, id: f.id, name: f.userFileName })}>
                                  Delete
                                </MenuItem>
                              </StyledMenu>
                            </>
                          }
                        >
                          <ListItemIcon>
                            <ImageIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={f.userFileName}
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    ))}

                  </List>
                )}
              </Grid>
            </Grid>
          </Paper>
          <NewFolderModal
            isOpened={mediaManager.modal_isNewFolderModalOpened}
            onClose={() => {
              setMediaManager(prevState => ({
                ...prevState,
                modal_isNewFolderModalOpened: false,
              }))
            }}
          />

          <RenameFolderModal
            isOpened={mediaManager.modal_isRenameFolderModalOpened}
            onClose={() => {
              setMediaManager(prevState => ({
                ...prevState,
                modal_isRenameFolderModalOpened: false,
              }))
            }}

          />

          <DeleteFolderModal
            isOpened={mediaManager.modal_isDeleteFolderModalOpened}
            onClose={() => {
              setMediaManager(prevState => ({
                ...prevState,
                modal_isDeleteFolderModalOpened: false,
              }))
            }}

          />

          <DeleteFileModal
            isOpened={mediaManager.modal_isDeleteFileModalOpened}
            onClose={() => {
              setMediaManager(prevState => ({
                ...prevState,
                modal_isDeleteFileModalOpened: false,
              }))
            }}
          />

          <RenameFileModal
            isOpened={mediaManager.modal_isRenameFileModalOpened}
            onClose={() => {
              setMediaManager(prevState => ({
                ...prevState,
                modal_isRenameFileModalOpened: false,
              }))
            }}

          />

          <DeleteFolderFailedModal
            isOpened={mediaManager.modal_isDeleteFolderFailedModalOpened}
            onClose={() => {
              setMediaManager(prevState => ({
                ...prevState,
                modal_isDeleteFolderFailedModalOpened: false,
              }))
            }}
          />
          <MoveFileModal
            isOpened={mediaManager.modal_isMoveFileModalOpened}
            onClose={() => {
              setMediaManager(prevState => ({
                ...prevState,
                modal_isMoveFileModalOpened: false,
              }));
            }}
            selectedFileId={mediaManager.selectedFileId}
            selectFileName={mediaManager.selectFileName}
          />
        </>
      )}
    </Box>
  )
}


export default FolderView